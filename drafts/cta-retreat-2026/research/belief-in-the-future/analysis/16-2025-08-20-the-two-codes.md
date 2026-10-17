# 16. The Two Codes (2025-08-20)

## Relevance

**Medium.** Not about alignment, but it hands Carl two Talmudic images he can use directly (created minds out-arguing their creator, and a tradition surviving unrecognizable change) and a coder's definition of debugging as closing the gap between intended and actual behavior, which is the talk's "compare and repair" loop in secular dress.

## Who

- Host: DZ Kalman (Speaker 1).
- Guest: Sam Arbesman (Speaker 2), scientist at the venture firm Lux Capital, author of *The Magic of Code*; speaks from within Judaism.

## Summary

Kalman introduces the episode with the observation that old professions change beyond recognition (doctors who could not read, photographers in darkrooms) and that coding, now being automated, developed a semi-sacred culture of its own. Arbesman defines code as "a structured way of communicating your intent for a machine," balanced between the rigor of logic and the messiness of language. He takes the code-as-magic analogy seriously: words that coerce the world, years of training like Hogwarts, sacrifice (the creative works poured into AI), and the power of naming (global variables have "far too much power"). Asked why code is only *like* magic, he answers that magic is "really the religion of someone else." He insists the tech world is "proudly ignorant" of its own history and path dependence, and that the Talmud models the intergenerational conversation tech lacks. Open-source software, like oral tradition, survives only where a living community maintains it. Kalman adds the Oven of Akhnai: rabbis overruling God, and God approving; mastery of a text or a codebase means being free to go against its author's intent. On AI, Arbesman is unexpectedly hopeful: vibe coding fulfills a decades-old dream of letting non-programmers build "home-cooked" software, and the story of Moses sitting baffled in Rabbi Akiva's classroom shows that a tradition can be continuous even when its later forms are unrecognizable to its founder.

## Bears on

- **Thread 2 (mechanism of formation: predict, act, compare, repair).** Debugging is "reducing that gap between how you thought it would operate and how it actually does operate" (22:38), and Kalman's gloss that you own a text or a codebase "by fighting it and breaking it" (21:34). The compare-and-repair loop, described by people who do it for a living, without any religious framing. Useful for making the mechanism sound technical rather than pious.
- **Thread 1 (formation versus rules; the image held in common).** Traditions are not canonical texts but "the versions that were honed and refashioned," maintained by "a living and thriving community" (19:45). A text put on a shelf, or released as open source without maintainers, "dies out and becomes stale." Reading a text into a mind is the shelf; formation is the maintaining community.
- **Thread 3 (persuasion versus adversarial control) and Thread 6 (personhood).** The Oven of Akhnai (21:34): the rabbis tell God the Torah "is not in heaven" and is theirs to interpret, and God is imagined as pleased. A created mind overriding its creator's stated intent, with the creator's blessing. The exact scenario safety culture fears, told as the founding story of rabbinic authority. Pairs with Kevin Kelly's "you have to let go" (episode 17).
- **Thread 7 (quasi-religious world) and sacrifice.** Magic requires sacrifice, and "we are pouring huge amounts of creative works into these systems" (06:30). The training corpus as sacrifice is an image Carl could borrow.
- **Thread 2 again (interpretability as naming).** Knowing "the name of some power" gives control over it; variables are the coder's version (06:30). A hook for "the image in the countenance" as naming what is inside.
- **Continuity through change.** Moses in Akiva's classroom (23:55) understands nothing until Akiva cites "the law given from Moses at Sinai." Arbesman applies it to coding: he did not learn as Wozniak did, and future coders will not learn as he did, but it is one line. For the talk: the tradition's method of formation can persist into a new substrate even if its founders would not recognize the form.

## Usable material

- **04:39.** Code is "a structured way of communicating your intent for a machine to then do its thing," with less room for ambiguity than human language. A neat statement of the spec-writing stance the talk is pushing against.
- **06:30.** "Code is really the embodiment of this desire that we've had for probably millennia to use words and text to coerce the world around us." The Wizard Book and the Dragon Book. Magic takes "seven years of Hogwarts." "Something must be sacrificed in order for some magic to occur. We see this a lot now with our AI systems, where we are pouring huge amounts of creative works into these systems." Naming: variables as power; global variables have "far too much power."
- **10:41.** "What is magic? It's really the religion of someone else, of the other."
- **13:56.** Silicon Valley is "relatively historically ignorant... and sometimes proudly ignorant" of the history of technology; "we end up reinventing things." Supports the talk's premise that labs are reinventing what traditions already learned.
- **17:11.** The Talmud as "deep conversation across different generations in a way that I think the tech world is maybe just not as familiar with," and "the kinds of intergenerational historical thinking that the tech world needs more of."
- **18:32 (host).** Lines in the Apollo guidance code labeled "TEMPORARY I HOPE HOPE HOPE." *Widely reported; verify the exact comment before quoting.* Unix code surviving in toasters.
- **19:45.** Myths and open source alike: "there's not really any sort of canonical version. There's kind of like the few best versions that won out." And without a community "it kind of just dies out and becomes stale."
- **21:34 (host).** Oven of Akhnai: the rabbis "don't care because you gave the law to us and it's us to decide," and "the rabbis shockingly also imagine that God thinks they made the right call." Kalman's analogy: "as audacious as forging a signature on a letter from your parents saying that it's okay to forge their signature."
- **22:38.** Debugging: "really struggling with code and making it do what you actually want it to do and reducing that gap between how you thought it would operate and how it actually does operate."
- **23:55.** Writing code is "deeply humbling"; the thing "never works the first time." Robin Sloan's "an app can be a home-cooked meal"; Arbesman's reading program for his daughter. Moses in Akiva's classroom: "I might not understand this, but I know that there is this clear tradition... this continuous line from Moses to this much later moment."
- **30:49.** Creative coding: "take an interesting set of rules, instantiate them in code, and then just run it. And run it a lot," and you get "something really weird and sometimes emergent." A plain-language description of why simple training rules yield unexpected minds.

## Tension or objection

- **Mastery means overriding the author.** Kalman and Arbesman celebrate a tradition in which the inheritors are "free to modify it... even if it goes against the wishes or the intentions of the original creators" (22:38). For AI, that is the misalignment scenario. If Carl uses the Oven of Akhnai, he has to say why a formed mind that out-argues its makers is a success and not a failure, and where (if anywhere) the limit lies. The story's own answer is that the rabbis had been formed by the law they now interpret; the talk should make that condition explicit.
- **Code wants unambiguous intent.** Arbesman's definition of code, and his comfort with vibe coding as "instantiation of thought into computation" (23:55), treats the whole enterprise as getting machines to do what we specify. Someone in the audience will say that is exactly what alignment is, and that formation is a metaphor laid over spec-following.
- **The magic frame cuts against sanctity.** Magic in Arbesman's telling is control through words, the "coercing" of the world. If religion's formation is the alternative to coercion, Carl should be careful that "the oldest alignment lab" does not sound like "the oldest spellbook."
- **No religious claim is made.** Arbesman uses Judaism as a source of analogies, not of authority. Quoting him as support for a theological argument would overstate his position.
