# 03 — Ghost in the Machine, 2024-07-15

## Relevance

High. A man who built a chatbot of his dead father, and a rabbi who notes that the Talmud is itself a thousand-year project of asking "what would this dead rabbi have said," give Carl both the personhood-and-copies thread and a striking precedent for the exemplar-prediction mechanism at the center of the talk.

## Who

- Host: DZ Kalman (Speaker 1 and, in the rabbi interview, Speaker 6; transcript renders "Davits V. Kallman").
- Guest 1: "Muhammad" (Speaker 2), surname not given in the transcript. A research scientist in Minneapolis who studied machine learning in graduate school, Muslim, youngest of four; his father moved from Pakistan to the US around 2000 and died in October 2013.
- Guest 2: Rabbi Ethan Witkowski (Speaker 5; spelling as rendered by the transcript), rabbi at Temple Beth El in Wynnewood, Pennsylvania.
- Speakers 3 and 4 are a Black Mirror clip; Speaker 7 is a Bose ad.

## Summary

Ten days before his father died, Muhammad decided he would one day simulate him so his unborn children could know their grandfather. He built "Abu Jani Bot" (externally "Grandpa Bot") from letters, texts, videos, and mostly recorded voice conversations; it is text-only, about 300 megabytes, and deliberately has no memory of past conversations so it will not drift away from the ten years of recordings. His metric was simply whether the output sounded like something his father would have said. He had strong emotional reactions at first and had to remind himself "this is code." His siblings refuse to use it, and his mother found it "too real"; his children now distinguish "grandfather who is in heaven" from "grandfather bot." Kalman then turns to a rabbi, reasoning that the relevant expert is whoever sits with grieving families. Witkowski observes that the Talmud is already imagined conversations between dead rabbis, that a static Maimonides chatbot is fine pedagogy but a simulated loved one competes with memory and plays on grief, that Breslov and Chabad froze time with a dead Rebbe, and that institutions would struggle to disagree with a resurrected founder. Kalman's own test: are you simulating the dead to stay in the past or to move forward?

## Bears on

- Thread 2 (mechanism of formation): the strongest hit. Witkowski at 27:23: the Talmud is "a bunch of imagined conversations between dead rabbis who never actually spoke to one another," where later layers ask "what would this dead rabbi have said had he been alive today" (Kalman, 29:12). This is the talk's mechanism, imagine the exemplar in your concrete situation and predict what he would do, operating as a textual tradition for a thousand years. Muhammad's eval metric, "does it sound like something that my father would have said" (11:38), is the same move applied to a model.
- Thread 6 (personhood, copies, deletion): a human mind compressed to 300 MB; Kalman's worry that simulating the dead "is bound to make people feel... that the person is in some way just fancy data" (24:27); the choice between a static model and one allowed to grow (14:24, 36:56); the Chabad rabbi who would not even discuss a Rebbe AI (39:52).
- Thread 1 (formation versus rules): Muhammad's observation that "our image of a person is also very relational" (16:01), his older siblings knew a sterner father, bears on "an image embodied in a person," and on the fact that a face is seen differently by different people.
- Thread 7 (quasi-religious AI): Witkowski's suggestion that a simulation might be used ritually, on the yahrzeit or during Yizkor, "with an understanding of what it is and isn't" (34:28), is a case of a religious practitioner absorbing AI into existing forms rather than inventing new ones.
- Thread 3 (suspicion): indirect. Witkowski's concern that grieving people will attribute personhood to anything (the blue jay, the butterfly) and that an AI "is sort of ripe to play on those sympathies" (45:16).

## Usable material

- 02:39: Muhammad's origin story. His brother calls to say the father will not survive; one of the thoughts in that moment is "maybe one day I will create a simulation of their grandfather." Vivid, humane, and non-technical; a good anecdote to open thread 6.
- 09:08: the training data was mostly voice recordings he had made just to listen to later. Kalman: "In another age, Muhammad's voice conversations would have been the way to remember his father. Now, they were just the raw ingredients for a simulated personality" (09:39).
- 10:15: he knows "it's not my father. It most certainly does not have a consciousness," yet after a few lines he would "turn off my computer and walk away." The gap between what one believes about a model and how one responds to it.
- 11:38: "the metric was does it sound like something that my father would have said?" Fidelity to a person as the evaluation criterion, which is thread 2 in one sentence.
- 11:56 and 24:27: the father occupies "a few 300 megabytes," which Kalman notes is "around the same space as a couple thousand ebooks." A concrete image for the copies-and-deletion thread.
- 14:24: no memory, because otherwise the system would "become more and more reflective of more recent conversations" and "develop a different personality." Kalman: keeping it static "allows it to serve the purpose that you want it to have, even if it means you end up sacrificing the ability to have it grow" (14:50). A real design choice that maps onto frozen weights versus continual learning, and onto whether an exemplar is allowed to change.
- 15:14: he has "reluctantly" added bits of data to answer his children's questions, guessing what his father would have said. Kalman: a system where "maybe it's just you who has the ability to know what the correct answer would be" (15:45). The grader encodes a morality, and here the grader is one grieving son.
- 16:01: "one can talk about a core essence of a person, but at the same time our image of a person is also very relational in nature." Useful for "the image in the countenance."
- 18:19: his eight-year-old distinguishes "grandfather who is in heaven" from "grandfather bot who is a software inside a computer." Children holding two ontologies without strain.
- 20:09: his younger daughter proposes putting the software in a robot that looks like grandpa "and then you can go and then you can hug that robot."
- 23:26: Muhammad's own warning: a customizable idealized person reduces "the incentives to interact with living, breathing human beings," since "human relationships are messy, require a lot of hard work."
- 27:23 to 31:14 (Witkowski): the Talmud as posthumous conversation. "In some ways, we've been trying this for a thousand years." And the limit: "a soul it's not, and a living intellect, it's not."
- 32:44: the distinction between resurrecting Maimonides (you only ever knew him through text, so a chatbot is "a different kind of pedagogy") and resurrecting someone you knew in person (an "uncanny valley"). Kalman adds that such a model "ends up kind of being in direct competition with our own memories" (33:30).
- 34:28: "We say that their memory should be bound up in the bond of life." The ritual alternative to simulation; and the surprising concession that a chatbot turned on once a year at the yahrzeit might be "ritually more on board."
- 37:49 to 40:29: Breslov and Chabad as communities that "froze time with the rabbi." The Chabad rabbi who declined: "you can't ask me about a Rebbe AI because I don't even want people to think about the possibility" (39:52). And the institutional worry: a resurrected Solomon Schechter would make it so "no one wants to go against the word of that great," and "now we're all just being run by an AI" (40:29).
- 42:56: Saul and the witch of Endor; Samuel "seems pretty annoyed about being awoken." Witkowski's point that necromancy laws do not apply because no one claims the soul returns, but a rationale that "the wisdom of the dead should die with them" might.
- 44:33 (Kalman): advanced AI is "making people reevaluate what it means to be a person," and the trend is "towards diminishing" humanity because it "is kind of like being unbundled into all these different subroutines." A crisp statement of the objectification worry.
- 47:17 (Witkowski): "So much of what we get out of human beings is conveyed in person, with touch, with acts of service, with being present." Kalman: models "have a bias towards the things you say, the things you do, measurable output" (47:57). Useful against a purely textual notion of formation.
- 52:34 (Kalman's test): "Are you simulating the dead because you want to stay in the past? Or because you want to move forward with your life?" And the generalization: religion is where "we need the wisdom of the past to live in the present," and people struggle when "that past feels like it's attempting to overthrow the present."
- Needs checking: Kalman cites a Guardian article (April 2024) that one Chinese developer has made simulations for 600 families and a Technology Review report of at least half a dozen Chinese companies doing this (06:10). Also "Temple Beth El in Wynnewood" and the spelling "Witkowski" are transcript renderings.

## Tension or objection

- Witkowski's firm line that a simulation is "a soul it's not, and a living intellect, it's not" (31:14), and his counsel against familial simulations, cut against treating model instances as persons at all. A religiously literate audience may side with him: the thing is a representation, so copying and deleting it is no more fraught than shredding a letter.
- Kalman's "unbundling" worry (44:33) is the mirror of Carl's: granting personhood to models may diminish the human rather than elevate the machine. Carl should say why "be slow to delete" does not feed that diminishment.
- The static-versus-growing choice (14:24) shows that fidelity to an exemplar and allowing the exemplar to change are in tension; a formation story needs to say which one it wants for a model.
- Muhammad's own ethic is that these systems have "done their job" if they "fool a human being" (21:24), which is a Turing-test criterion, not a character criterion; the gap between those two is the gap Carl's thread 5 is trying to close.
