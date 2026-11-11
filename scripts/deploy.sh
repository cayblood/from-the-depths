#!/usr/bin/env bash
# Upload the built site to an S3 bucket behind CloudFront and invalidate the cache.
#
# Usage: scripts/deploy.sh <site-domain>
#   e.g. scripts/deploy.sh blog.youngbloods.org
#
# The bucket name and distribution id come from the CloudFormation stack that
# infra/static-site.yaml created for that domain (stack "site-<domain-with-dashes>").
set -euo pipefail

domain="${1:?usage: scripts/deploy.sh <site-domain>}"
region="${INFRA_REGION:-us-east-1}"
build_dir="${BUILD_DIR:-dist/client}"
stack="site-${domain//./-}"

if [[ ! -f "$build_dir/index.html" ]]; then
  echo "No build at $build_dir/index.html; run 'bun run build' first." >&2
  exit 1
fi

outputs=$(aws cloudformation describe-stacks --region "$region" --stack-name "$stack" \
  --query 'Stacks[0].Outputs' --output json)
bucket=$(jq -r '.[] | select(.OutputKey=="BucketName") | .OutputValue' <<<"$outputs")
distribution=$(jq -r '.[] | select(.OutputKey=="DistributionId") | .OutputValue' <<<"$outputs")

echo "Deploying $build_dir to s3://$bucket (distribution $distribution)"

# Hashed build assets never change at a given path: cache them for a year.
aws s3 sync "$build_dir/assets" "s3://$bucket/assets" --delete --no-progress \
  --cache-control "public, max-age=31536000, immutable"

# Everything else (HTML, feeds, images at stable paths) revalidates after five minutes.
aws s3 sync "$build_dir" "s3://$bucket" --delete --no-progress --exclude "assets/*" \
  --cache-control "public, max-age=300"

invalidation=$(aws cloudfront create-invalidation --distribution-id "$distribution" \
  --paths "/*" --query 'Invalidation.Id' --output text)
echo "Invalidation $invalidation created; waiting for it to finish..."
aws cloudfront wait invalidation-completed --distribution-id "$distribution" --id "$invalidation"
echo "Done: https://$domain/"
