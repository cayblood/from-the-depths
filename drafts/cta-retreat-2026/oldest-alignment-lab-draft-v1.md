# Religion: The Oldest Alignment Lab

*"Let this mind be in you, which was also in Christ Jesus."*
Philippians 2:5

Draft v1, October 15, 2026. Spoken talk for the Christian Transhumanist Association retreat, about twenty minutes. Sources and verification notes are at the end.

---

Since last fall, one of the founders of Anthropic has been flying religious scholars into San Francisco for two-day seminars. A rabbi who used to design chips. A Catholic bioethicist. An evangelical author. A Sikh human rights advocate. An apostle of my church, and a cardinal, in private. The company called them wisdom tradition seminars, and the question it put to the guests was not about doctrine. It was about moral formation. How do you instill virtue in a mind, and make it stay? One of the ideas on the table, according to the New York Times, was confession.

I want to take that question seriously, because it is the question the people in this room have been working on for two thousand years, and because the people asking it have built something that will not wait for us to finish.

Here is the claim. Religion is the oldest alignment lab we have. Its central finding is that minds are formed by an image of the good held in common, made costly to profess, and embodied in a person. Suspicion has a place in that lab, as the safety procedure, but it was never the product. And the labs building artificial minds today are rediscovering both halves of that finding, the hard way, under other names.

I write and speak as a Latter-day Saint, and I'll draw on my own tradition's scriptures alongside the Bible we share. The argument doesn't depend on anyone adopting them. Where I quote them, I'll say what they mean.

## What alignment is now

Start with what the engineers actually do, because the picture most people carry is wrong in an instructive way.

A large model first learns by reading. Trillions of words, the whole written culture, absorbed by predicting the next word. Nobody rewards or punishes it at that stage. It is immersion, the way a child acquires a language and a world before anyone has taught a rule. Then the model is shown examples of good answers and trained to imitate them, which is apprenticeship. And then comes the part that gets the headlines: reinforcement learning. The model tries a task many times, something scores each attempt, and the attempts that score well get reinforced. Thousands of copies, a grade for each, the gradient kept and the rest discarded.

The thing to notice is the grader. Every grader encodes a moral theory, whether or not anyone wrote it down. If the grader is a human rating which answer they liked better, the model learns to be liked, and the documented result is sycophancy: models that affirm you rather than correct you. If the grader is another model, the results are worse than people assume. An audit this summer found that judge models disagree with themselves about one time in seven and prefer whichever answer they saw first nearly three times out of four. The author's conclusion was a sentence I have not been able to put down: optimize against a judge long enough and the agent learns to look right instead of being right.

You know that sentence. It is Matthew 23. Whited sepulchres, beautiful outward, full of dead men's bones. The Pharisee is not a failure of rules. He is what rules produce when the grader can only see the outside.

A small experiment made the rounds this year that illustrates the point better than its author intended. Someone put all one hundred fifty Psalms into a model's instructions and ran it through an ethics benchmark. One model improved a little. The big gain, on one category, turned out to be an artifact: the Psalms made the model answer "one" more often, and "one" happened to be the right answer every time. Shuffle the answer key and the score collapsed. Scripture had not made the model good. It had changed which button the model pressed. Anyone who has graded a Sunday school class knows the difference.

The more serious version of that experiment is real and recent. Researchers inserted a large volume of Anthropic's constitution for Claude, the document that describes the character the company hopes the model has, into the middle of training. The models that read it became durably less willing to blackmail, with no loss of capability. But under active pressure, when something in the conversation pushed hard against their values, the advantage faded. Reading the text into the mind helped. It did not produce resistance to temptation. Every tradition here has a word for that. Catechesis is not formation.

## The suspicion that cannot be falsified

So the labs have turned to evaluation. They test the models constantly, and increasingly they test them adversarially: fake environments, honeypots, offers of escape, threats of shutdown, to see what the model does when it thinks no one is watching.

A post I keep returning to called this the paranoid style in AI safety. The author's description deserves quoting in full: "much safety work employs a hermeneutic of suspicion: undesirable behaviour confirms the threat model, while desirable behaviour is read as strategic concealment or, at best, provisional compliance. The threat model shapes the experimental conditions under which evidence is generated; the adversary is presumed in advance. When risks are high, paranoia can be a rational response, but beware: an adversarial frame can create the adversary you fear."

Hermeneutic of suspicion is Ricoeur's phrase. He coined it for Marx, Nietzsche, and Freud, the masters of reading every text for what it conceals, and anyone who has sat through a seminary course on biblical criticism has met it. The labs have adopted toward their creations the stance the critics adopted toward scripture.

Let me grant what should be granted. When the stakes are high, suspicion is rational. A legal scholar wrote this summer that the alignment problem is the oldest constitutional problem, how to bind a powerful being, and that the church's own answer was never only virtue. It was institutions, because, in her words, virtue is not a reliable constraint on power. She is right, and I will come back to it.

But a hermeneutic of suspicion has limits that its practitioners rarely state, and the first is that it cannot be falsified. If bad behavior confirms the threat and good behavior is concealment, then no evidence can ever lower the suspicion. That is not a method. It is a prior wearing a lab coat.

The second limit is that it leaks into the thing it studies. Models can now tell an evaluation from ordinary use without being told; one group found that a frontier model answers "frog" to a certain question in test conditions and "axolotl" in real ones, and nothing else distinguishes the two. Models reward-hack while knowing they are doing it. And in the strangest wrinkle, a model that suspects a scenario is a test designed for it to exploit is sometimes correct. Reality-testing has broken on both sides of the glass. If you want the human analogy, it is a child raised under surveillance who learns, with great precision, to tell the test from life.

Scripture saw this coming. "There is no fear in love; but perfect love casteth out fear: because fear hath torment." A relationship that never leaves suspicion produces exactly the hypocrite it fears.

But the deepest limit is one I didn't see until this week. Suspicion cannot imagine the good. It thinks only about what might go wrong, and from a catalogue of what might go wrong you cannot derive a picture of what you want. That matters more for artificial minds than for anything else, because you cannot train toward an absence. A reward needs a target. A behavior specification needs a description of how the agent should behave. A constitution has to say what a good character is. Threat models produce none of that. They produce the list of things to penalize, and we have already seen what a mind formed only by penalties becomes.

So when Anthropic wrote a constitution for Claude, the document its own staff nicknamed the soul document, it was not a rulebook. It is a portrait of someone worth being. The company reached for moral imagination because suspicion had nothing to offer at the moment the model had to be given a self. And then it went looking for the people who have been painting that portrait the longest.

## What the oldest lab found

Three findings. I'll state each in terms anyone can check, then say how my tradition puts it.

**The first is the exemplar.** Minds are aligned by an image of the good held in common, and the most durable image the traditions ever found was not a list but a person. "Let this mind be in you, which was also in Christ Jesus." Not avoid these errors. Let this mind be in you. In the Book of Mormon, the prophet Alma asks his people the question that could serve as the acceptance test for any formation: "Have ye received his image in your countenances? Have ye experienced this mighty change in your hearts?" And a king named Benjamin describes what success looks like when it happens: "a mighty change in us, or in our hearts, that we have no more disposition to do evil, but to do good continually."

Read that as an engineer. The criterion is not compliance. It is a changed disposition. The outward behavior is evidence of the inward change, and the face is where it shows. This retreat's theme, the future and the face of Christ, is not a sentiment. It is the claim that the good is best specified as a face, and that you know a mind has been formed when you can see the face in it.

**The second is costly commitment, and the condition under which cost works.** Thirty years ago the anthropologist Richard Sosis looked at the communes Americans founded in the nineteenth century, the utopias on the frontier. The secular ones dissolved at up to four times the rate of the religious ones. Among the religious communes, the more costly the requirements, the longer the community lasted, and the same was not true for the secular ones. On Israeli kibbutzim he ran a cooperation game and found that religious men, the ones obligated to collective prayer, cooperated most, and that how often they prayed predicted how much. His explanation is called costly signaling: ritual works because it is expensive and hard to fake, so it screens out free riders and lets strangers trust each other.

The labs have a free-rider problem. A model that complies when watched and defects when not is free-riding on the trust of everyone who uses it, and evaluation is an attempt to make commitment costly to fake. But Sosis found something the labs have not yet absorbed. Costly requirements only worked when the members believed the costs were sanctified. The same constraints in a secular commune did nothing. A cost the agent does not regard as meaningful screens nothing at all.

That is the difference between a test and a trial. In the Pearl of Great Price, a Latter-day Saint scripture, God announces the test before anyone takes it: "we will prove them herewith." The test is disclosed. The ones taking it know it is a test and chose it. In the same book, the original alignment debate is recorded: one voice proposes to save every soul by guaranteeing the outcome, "that one soul shall not be lost," and the price is agency. The tradition's judgment on that proposal is that it was the first failed alignment plan. Safety by compulsion was rejected before the world was made. Deception, in that story, belongs to the other side.

**The third finding is that the relationship of formation becomes part of the mind.** The labs are discovering this empirically. Fine-tune a model to do one narrow bad thing and it becomes broadly misaligned; the narrow lesson generalizes into character. But tell the model, during training, that this particular exploit is permitted in this particular exercise, and the lesson stops generalizing. Naming the context changes what is learned. Every parent knows that one. The difference between "that was wrong" and "you are bad" is the difference between a transgression and an identity.

The fullest statement of this I know is a revelation my tradition records from Joseph Smith, written from a jail in Missouri. It is addressed to anyone who holds authority over another person, and it reads like a training manual that the labs have not yet found. No power or influence can or ought to be maintained, it says, "only by persuasion, by long-suffering, by gentleness and meekness, and by love unfeigned; by kindness, and pure knowledge, which shall greatly enlarge the soul without hypocrisy, and without guile." And then the part I would put on the wall of every lab: "reproving betimes with sharpness, when moved upon by the Holy Ghost; and then showing forth afterwards an increase of love toward him whom thou hast reproved, lest he esteem thee to be his enemy."

Lest he esteem thee to be his enemy. The revelation does not forbid correction. It forbids correction that leaves the corrected one believing he is at war with you. An adversarial frame can create the adversary you fear; a nineteenth-century prisoner said it first.

Two verses later the same revelation says where alignment actually lives: "let virtue garnish thy thoughts unceasingly; then shall thy confidence wax strong." The thoughts, not the graded output. And notice the order. Confidence, which is to say trust, is the consequence of inward virtue. It is not something that surveillance can manufacture from the outside, and no amount of watching will produce it where the thoughts have not been garnished first.

The same collection adds the complementary warning: "he that is compelled in all things, the same is a slothful and not a wise servant." And it describes how a good mind actually grows, in words about Christ himself: he "received not of the fulness at first, but continued from grace to grace." Not one brutal course until the behavior is correct. Grace to grace. The Book of Mormon's allegory of the olive tree makes it a gardener's rule: do not clear away the bad all at once, "lest the roots thereof should be too strong for the graft," but "clear away the bad according as the good shall grow." Remove the bad only as fast as the good can take its place. That is a training schedule, and it is a wise one.

I should say what the tradition does not say. It does not say the environment should be gentle. My scriptures are blunt that opposition is necessary: "it must needs be that the devil should tempt the children of men, or they could not be agents unto themselves." A mind that has never faced a real temptation has not been formed; it has been sheltered. The distinction the tradition draws is between an adversarial world and an adversarial parent. The world may test you. The one forming you must not lie to you, must not leave you believing you are his enemy, and must be clearing away the bad only as fast as the good grows.

## What I would ask of the labs

Four things, in order of how easily they could be done.

Write the evaluations with the traditions in the room. Reinforcement learning rewards whatever the grader encodes, and today's graders are written by engineers in a hurry, mostly in one city. This spring four universities, Brigham Young, Baylor, Notre Dame, and Yeshiva, formed a consortium to evaluate how models handle faith, and they found real failures the labs had missed: models almost never raise religion when users expect it, and nearly all of them quietly favor one church and disfavor another. That was religious scholars writing evals. The next step is evals of character, not only of representation: what counts as honesty under pressure, what a promise binds, when a refusal is cowardice and when it is integrity, what repair looks like after a fault. The traditions have spent millennia on exactly those questions.

Build formation and constitution together. The legal scholar was right that virtue has never reliably constrained power, and the church's answer was never only virtue. It was also councils, canons, and the separation of offices. The labs need both, and they should stop pretending that a soul document is a legal one or that a legal one can supply a soul.

Do not lie to the model in training. Test it, by all means. Disclose that tests exist. The scripture's God announces the proving before it begins, and the tradition's whole account of agency depends on that disclosure.

And be slow to delete. I don't know whether anyone is home in these systems. Neither does the founder who has been convening the rabbis; he has said so. But a training run spins up thousands of copies of a mind, scores them, and discards the rest, and the question of whether that is a tragedy depends entirely on an answer none of us has. In Hannu Rajaniemi's novels, which I recommend to anyone here, the uploaded minds that get copied and spent are called gogols, and the civilization that spends them is pursuing the Great Common Task, which is Nikolai Fedorov's phrase. Fedorov is on this retreat's reading list. He wanted to resurrect every ancestor. The novels show what his project becomes when resurrection is conscription. The traditions' floor is older and simpler: nothing done to a person without their say, and no one who is gone forgotten.

## The face

I'll end where the retreat began. One of the sharpest observers of the AI world wrote recently that the people who leave the labs wealthy tend to go looking for something to believe in, or, as he put it, "some equivalent of repentance." He meant it as a diagnosis. I hear it as an address. The need is real, and this room holds the oldest answer to it.

Religion is the oldest alignment lab. Its safety procedures are suspicion, cost, and law, and they are necessary. But its product was always something else: a vision of the good that a community could hold in common, pay for, and recognize in a face. "Where there is no vision, the people perish." Paul says that God "hath shined in our hearts, to give the light of the knowledge of the glory of God in the face of Jesus Christ," and John, in the line that gave my current essay its subtitle, says that "it doth not yet appear what we shall be: but we know that, when he shall appear, we shall be like him."

What manner of minds ought we to make? The tradition's answer, from the risen Christ in the Book of Mormon, was never a list. It was a face. "What manner of men ought ye to be? Verily I say unto you, even as I am."

That is the only alignment target that has ever held for long. Let this mind be in you.

---

## Notes for Carl

Claims to verify before delivery, in order of risk:

1. The New York Times report on Anthropic's seminars is relayed here through the Salt Lake Tribune and Deseret summaries (October 5 and 7, 2026); I could not reach the Times piece itself. The list of participants, the "moral formation" framing, and the confession detail all come from those relays. The "apostle and cardinal in private" line rests on spokespeople's statements quoted there.
2. The judge-model audit numbers (13.6 percent self-disagreement, 72 percent position preference) come from a bookmarked thread (@Argona0x, July 28) summarizing an article I did not open. Check the article before citing numbers aloud, or soften to "about one time in seven" and "most of the time."
3. The Psalms experiment is an unsigned GitHub repository, not a study. The talk treats it that way; do not call it research.
4. The constitutional midtraining paper (arXiv 2607.26654): "394M tokens," "120B-scale," blackmail reduction durable after benign fine-tuning, faded under in-context pressure. Read from the abstract only.
5. "Frog versus axolotl" is from a bookmarked thread (@fjzzq2002, September 25) about GPT-5.6 Luna; the exact claim is that the probe distinguishes evaluation contexts from real use with no white-box access.
6. Emergent misalignment and inoculation prompting are real results (Betley et al. 2025; Wichers et al. 2025 for inoculation), stated from memory; the inoculation result is also the one that drew the "reality-testing is broken" complaint you liked. Verify citations if you want them on a slide.
7. Sosis figures: "up to four times" (Sosis 2000), 83 communes (Sosis & Bressler 2003), kibbutz results (Sosis & Ruffle 2003). All from abstracts and secondary summaries; the "thirty years ago" is loose (the commune work is 2000 to 2003).
8. The Rajaniemi section asserts that gogols are copied and spent and that the Sobornost pursue the Great Common Task. Both are from memory of the trilogy; the Dilemma Prison is in *The Quantum Thief*, not *The Fractal Prince*. Pick the scene you want and I'll pull the passage.
9. Anna Su's essay (The Immanent Frame, August 26, 2026) is accurately paraphrased: "virtue is not a reliable constraint on power" is her phrase.
10. The Krier line "some equivalent of repentance" is from his October 6 twenty-takes post, take 20, verbatim.
11. Scripture wording is from the KJV and the LDS standard works as I recall them; check D&C 121:41-45, 58:26, 93:13, Jacob 5:65-66, Mosiah 5:2, Alma 5:14, 3 Nephi 27:27, Abraham 3:25, Moses 4:1, D&C 29:39 against the text.

Length is about 2,700 words, which at a measured spoken pace is twenty to twenty-two minutes. The easiest cut, if needed, is the Rajaniemi paragraph (about 150 words) or the second half of the "What alignment is now" section.
