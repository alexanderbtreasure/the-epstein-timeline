# the-epstein-timeline
[This website](https://www.epsteintimeline.org/) is meant to transparently serve as a crowd-sourced repository of information relating to the case of Jeffrey Epstein, his associates, and his victims. The aim is to a properly-cited collaborative source of truth to keep an honest and open record of easily-searchable events, as it's easy to forget just how much there is to this whole ordeal.

If you are interested, you are welcome and encouraged to become a contributor of this project. Native translation efforts are especially welcome. Read on to find out how to get involved.

## Contribution Guide
> [!IMPORTANT]
> *Please read the entirety of the contribution guide **before** submitting something either to issues or pull requests.*

### Website bugs

Raise an issue with the label "bug" and describe the issue, along with what browser and what browser version you're currently using.

### UI/UX/functionality suggestions/changes

Create a discussion with the label "enhancement" and describe what your ideas are. Prioritize accessibility. Approved issues will be relegated to a `feature` PR at some point in the future.

### Content challenges/questions

Challenges or questions concerning whether content is correct or correctly phrased (or indeed, needs additional context/citation) should be raised in Discussions and titled according to the timestamp of the entry. The body of the post should contain the content in question as well as a primary source, and include a description of why the challenge is being issued. If a discussion has already been raised for a specific entry, *do not create a new one, and instead add to the previous one.* The goal of this is to have these issues function essentially as wiki talk pages.

> [!NOTE]
> When in doubt of the law surrounding a contribution, *including when linking a source*, e.g. copyright, victim identity, etc., always err on the side of caution.

### New content

From here below is a styling guide for how to submit new content.

If submitting new content, follow the outline in `data/template.json` and add it to your local copy under `data/milestones/[locale]`, branch the content branch from `development` into `content/[timestamp]` (e.g. `content/2026-01-05`), and submit your update as a pull request (PR) with a request to merge to `content/[locale]` e.g. `content/en-US`.

*What content is worth a new timeline bullet?*
* Any new information released.
* Any new public statement released by an affiliated individual.
* Any change in the status quo (e.g. an update on Ghislaine Maxwell's status).
* Case updates.
* Legal proposals, filings, and challenges.

*What content is worth modifying an existing timeline bullet?*
* Information revealed by an office in a press conference about an event (e.g. EFTA file release) should instead be relegated to the originating timeline bullet, with a note if it occurred on a different day.
* Information previously unreported but directly related to a previous event (e.g. EFTA file dump revealing something new, but only gets reported on 5 days later should modify the EFTA bullet).

There are edge cases; ask if in doubt.

> [!TIP]
> Looking at existing content's format under `data/milestones/[locale]` provides a good example of how to format content.

### Description information guidelines

The description should remain as unbiased as possible, clearly stating fact as fact, claim as claim, and speculation as speculation. Sourcing people mentioned in the files should be taken with a grain of salt where there is room for error.

### Headline information guidelines

The headline should be clear, concise, and unbiased.

### Image information guidelines

Do *NOT* directly hotlink images and be mindful of copyright prior to submission. Do not include an image if there is no *directly* relevant, non-public domain image (e.g. content on Bill Gates should not include a random public domain image of Bill Gates). If an image is *directly* relevant and reusable, then reuse it and don't create a new copy (keeps the website's file size down).

Images should be submitted in a .webp format alongside the PR, with the same timeline bullet name (e.g. `2026-01-05.webp`). Keep the image dimensions as the original where possible, and keep the image as uncompressed as possible.

### Info information guidelines

Info panels are for contextual information (including back-referencing previous timeline entries if i.e. someone changes their stance) or additional information (including what stemmed or resulted from an event). Info panels should be atomic and singlely-sourced; if there are two appropriate sources for an item, it either needs to be its own timeline bullet or it needs to be more than one info panel.

Inside of the info panel, the description should follow the same methodology as decribed in ["Description information guidelines"](#description-information-guidelines). Descriptions are for summaries of information. Notes should follow naturally from the description, providing additional information or context to the descrption, and should be independently verifiable by the info source.  Sourcing should follow the same methodology as described in ["Sourcing information guidelines"](#sourcing-information-guidelines)

### Sourcing information guidelines

The description and headline both should be independently verifiable by only the primary sources.

Example sources can be found below:

*Acceptable sources:*
* Direct media: PDFs of legal documents, press releases straight from the owner's website, Youtube, X/Twitter
* Archived direct media (if the original has been deleted): archive.org, xcancel (other archives may also be acceptable, but check these first since they're well-known)
* Government/government-backed neutral media: C-SPAN, PBS, NPR
* News wires: AP News, Reuters

> [!TIP]
> Prioritize direct sources of information over indirect. This is so visitors can click the link and immediately validate the referred item, without needing to filter that information through whatever lens the indirect source is giving. This means in particular, for Youtube, link the timestamp where the quote is referenced. No timestamp is needed if the data point is the whole video. This also includes if a potential source references, for example, an AP News report, then the AP News report should be cited directly.

*Potential sources:*
* Original reporting: Politico, The Guardian, The New York Times, etc.

> [!TIP]
> If a potential source is the original source of that information (e.g. birthday card from Trump to Epstein), then it *needs* cited appropriately as the originating source. If the original source is external (e.g. AP News's Bureau of Prisons FOIA request) but initiated by that entity, the entity needs to be credited but does not necessarily need to be cited.

*Never acceptable sources (unless the primary source of a quote, e.g. an interview hosted only on that source's Youtube channel):*
* Editorialized content: Fox News, CNN, Newsmaxx
* Commentary: talk shows, reaction videos, speculative podcasts

> [!TIP]
> What pundits say about events isn't useful for this site. What celebrities say is similarly not useful. Stick to the people either directly implicated at least in part by the files (Trump, Clinton, Gates, etc.) or in authority over some part of the case (Patel, Bondi, further back like Alexander Acosta). This means, using EFTA and Congress for an example, that only the Chamber Leaders (Speaker/VP/President pro tempore, Majority/Minority Leaders, Majority/Minority Whips), and bill co-authors (Reps. Ro Khanna and Thomas Massie) are relevant sources of information.

### Tagging information guidelines

Tags are used for the search function to filter content for the user. Tags should be relevant to the "who" or the "what" relating to the content of the full timeline bullet. Match existing tags identically. If creating a new tag, mention that in the PR.

### Type information guidelines

Types are used in the rendering of the site to help the user more easily find and filter necessary information. "`major`" types are based on the importance of the event, not the person (e.g. Trump changing stances or commenting on Epstein is still only a `minor` event despite his office, whereas the release of new primary data will almost always be `major`.)

### AI usage guidelines

For the sake of accuracy, please do not use AI with the aim of content creation. Templating/coding efforts can use AI as an assistant, but to maintain both accuracy and precision, content needs to be curated by humans. Quality over quantity. More simply, when in doubt, nothing AI-generated should reach human eyes on this site.

## Copyright information

### Contribution copyrights

Any contributions are protected under [CC BY-NC-ND](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en) (i.e., attribution required, content cannot be used commercially or modified from source).

### Citation

For external individuals wanting to properly cite this collaborative effort, either do not list an author and simply link the site, or cite the author as: "The Epstein Timeline Group."

### License

Why not operate on an open-source license? Open-source strictly requires that code be available for commercial reproduction. Given the nature and severity of crimes alleged, commercialization is not permissible for this codebase. The chosen license gives contributors the opportunity to fork and make pull requests as appropriate, which should cover all reasonable use cases.

### Questions

Any further questions about copyright or citation can be had over in the discussions.
