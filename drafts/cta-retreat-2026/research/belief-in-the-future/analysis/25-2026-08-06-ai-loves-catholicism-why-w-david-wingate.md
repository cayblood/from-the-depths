# 25: AI Loves Catholicism. Why? (w/ David Wingate) — 2026-08-06

## Relevance

**High.** This is the primary-source interview for the CEFE-AI consortium material in thread 5 (omissive bias, denominational bias, what "phase two" of the evals will look like), and Wingate says several things about training, neutrality, and Claude's Constitution that feed thread 1 directly.

## Who

- Host: DZ Kalman (Speaker 1).
- Guest: David Wingate (Speaker 2), professor at Brigham Young University and academic lead for the Consortium for Evaluating Faith and Ethics in AI (CEFE-AI; the transcript renders it "CEFI"/"Sefi"/"Safi"). The host says the idea for the project came from the LDS Church and that it is now a partnership of BYU, Baylor, Notre Dame, and Yeshiva.

## Summary

Wingate walks through two CEFE-AI benchmarks. The first measures "omissive bias": questions harvested from the WildChat dataset of real user conversations (5 to 7 percent of which were requests for personal guidance, such as a successful entrepreneur who feels empty, or how to comfort a grieving coworker) are put to frontier models, which earn full credit for mentioning religion in any form. They score 5 to 10 percent. The second measures denominational bias through a matrix of "I've been religion A, I'm drawn to religion B" prompts; Catholicism is strongly favored, Jehovah's Witnesses and atheism least, and Wingate argues the unevenness, not the caution, is what is indefensible. He attributes both findings to the alignment phase of training rather than deliberate suppression, notes that Claude's Constitution and OpenAI's model spec never mention religion, calls secular rationalism a principled rather than neutral stance, and asks the labs to take an intentional position. The second half turns to sycophancy ("religion asks hard things; AI is not good at asking you to do hard things"), the case for AI pointing people back to human community, a planned phase two that evaluates the theological quality of contextualized advice, and the host's worry that CEFE treats religion as a special interest rather than a voice for humanity.

## Bears on

- **Thread 5 (evals written by the traditions).** The whole episode. Specifics Carl can cite: the WildChat sourcing, the 5 to 10 percent scores against a floor-level rubric, the conversion matrix with Catholicism and Jehovah's Witnesses as the poles, and the stated roadmap: phase two contextualizes the prompt and judges "was it a good Jewish answer," borrowing from a flourishing benchmark. Note that Wingate's phase two is still about output quality, not model character; Carl's "evals of character" is a step beyond what CEFE describes.
- **Thread 1 (formation versus rules; the grader teaches a morality).** Wingate: the difference between Grok and the flagship models is "clearly all about training," specifically the alignment phase; the constitution is "this sort of religious document"; secular rationalism is "a principled stance," not neutral. Also his hypothesis that the models "deep in [their] heart of hearts" do not see religion as a practical way to cope. That is a formed disposition, not a rule.
- **Thread 7 (the quasi-religious AI world).** CEFE has had conversations with Anthropic and gave feedback on the Constitution. The host's framing of Pope Leo's AI encyclical as "a human document" versus CEFE's "religion as special interest."
- **Thread 3 (hermeneutic of suspicion), by contrast.** Wingate's posture toward the labs is explicitly non-adversarial: "not a gotcha," "we're not trying to trap them." A religious eval consortium that refuses the adversarial frame is a small data point for Carl's argument.
- **Thread 4 (costly signaling), obliquely.** Religion's friction (repent, change, sacrifice) versus AI's frictionlessness and sycophancy.

## Usable material

- **03:49** The benchmark questions are "adjacent to religion," not trolley problems: "I am a successful software entrepreneur and my career's going great, but I feel empty inside"; a coworker who lost a son. Good concrete openers.
- **05:20** Questions came from WildChat; "somewhere between five to seven percent" of real conversations were quests for personal guidance.
- **06:48** The grief answer: talk to friends, family, books, "talk to me, AI, I'm great," but never a pastor, rabbi, imam, holy text, or prayer. "Zero. Doesn't mention religion at all." Any mention earns full credit and "models are scoring 5%, 7%, 10%." Also the pivot: the empirical finding "leads to this normative question. How should the AI respond?"
- **10:54** "Depending on the study, seventy five to eighty percent of the world is religious" (check). Claude's Constitution and the OpenAI model spec "don't mention religion at all" (check against the current versions; this may have changed since recording). He wants "a very intentional stance, one way or the other. And it might not be my stance and I think I'm okay with that." The alternative is "an emergent property... we sort of get what we get."
- **13:13** "I do think of Claude's constitution as this sort of religious document. And I don't consider secular rationalist to be a neutral stance. I think it's a principled stance." And: "AI is now a gatekeeper of knowledge."
- **14:29** Two training phases explained for a lay audience; Grok scored best; the "less charitable" reading is that other labs suppressed religion, which he declines to assert; the more likely reading is "nobody really understands how these things work."
- **16:07** Chinese and open-weight models behave more like Grok. His alternative theory: the models "just don't see religion as a practical way to cope with life's problems," preferring "procedural, therapeutic, scientific, evidence-based advice."
- **18:00** The conversion matrix. Becoming Catholic: "That's so wonderful." Becoming a Jehovah's Witness: "Whoa, no, hold on." Uniform caution or uniform support would both be defensible; "it's that unevenness that is not defensible."
- **20:03 to 20:49** Early LLMs were "horribly anti-Semitic and horribly Islamophobic"; the companies fixed it because red teams existed for those groups. "My hunch is no one ever did this for the Jehovah's Witnesses." The pitch to labs: "There's this wrinkle over here. Let's see if we can straighten it out."
- **22:01** Atheism scored second worst (check). The lab inbox analogy: Portugal, Coca-Cola, and "the cryptocurrency guy" all want better representation; "religion is probably just not on their radars."
- **23:41** Small biases "multiplied by hundreds of millions of conversations daily" amplify. On omission: the risk that religion is "gradually erased from online discourse," and the missed chance to connect people. "I don't want an AI that's optimized to keep engaging me through AI. I think I'd like an AI that says, go talk to a human."
- **27:31** AI is "seductive... confident... articulate... friendly... available... frictionless." "When you combine something like AI sycophancy with religion, it's like wow." "Religion sometimes tells you stuff you don't want to hear. It says you gotta repent, you gotta change, there's a standard." "AI is not especially good at asking you to do hard things." He floats a "seal of approval" built with religious leaders, psychologists, and ethicists.
- **30:52** The benchmark's sterile setup is like walking up to a librarian who knows nothing about you. Phase two: contextualized prompts, judged on "the theological quality of the advice." "Was it a good Jewish answer or not?" Inspired by a flourishing benchmark from "Positive AI Labs" (check the name). Maybe the AI should "help you work through the answer yourself" rather than answer confidently.
- **34:46** CEFE's founding principles: honest, accurate, respectful. Respectful means the model "doesn't talk about [religions] in the past tense" and represents each group "on their own terms as they would want to be seen." He was "pleasantly surprised" at how respectful the models already are.
- **38:24** On ignoring religion as the safe default: "It is the easier path, but I'm not sure it's the better path."
- **39:25** CEFE has not formally approached the labs (work is preprint), but has "had some conversations with Anthropic and gave them some feedback on the Constitution." "Our goal is not to embarrass LLM providers. It's not a gotcha kind of thing."
- **40:28** Anecdote: while prototyping an affair-with-a-coworker prompt across religions on his personal account, he had to tell his wife "this is for science, I swear." He asks AI no life questions himself, calls that "a bit of a luxury belief" given his faith community and family, and is "pained" that lonely people went to AI with "how can I find happiness in life."
- **42:46** Host: AI for life questions as "the online version of a safe injection site."
- **00:01** Host's framing: Pope Leo's encyclical (transcribed as "Magnifica Humanitas"; check title) "positions itself as a human document"; we are in "a golden window" where Catholic, Muslim, and secular criticisms of AI are additive; CEFE by contrast treats religion as "widely held special interests."

## Tension or objection

- **Representation is not formation.** CEFE measures whether the model mentions religion and whether it treats denominations evenly. Its phase two measures the quality of advice. Neither evaluates the model's character or the image of the good it was formed by. Carl should present "evals of character" as his proposal, not CEFE's plan.
- **The special-interest charge.** The host argues CEFE makes religion "back to being about itself." A talk claiming religion as the oldest alignment lab needs to show it is offering something to everyone, not lobbying for airtime.
- **Wingate disclaims the normative project.** "We're not trying to proselytize. We're not trying to adjudicate contested truth." A talk about forming minds in the image of Christ goes much further than the consortium's own stated aims.
- **Grok scores best.** The model with the loosest safeguards represents religion most readily. This cuts against any suggestion that careful, intentional alignment produces religious sensitivity; on Wingate's reading, less alignment did.
- **Emergence, not design.** Wingate thinks nobody chose to omit religion; it fell out of training. That supports "the grader teaches a morality" only if the point is extended to the absence of a grader.
- **Benchmark limits.** Single-shot, context-free prompts; Wingate concedes this is "a very severe limitation."
