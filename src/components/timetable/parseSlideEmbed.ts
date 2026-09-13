export const SLIDES_URL_NEEDS_MANUAL = "needsManual";

type SlideEmbed =
  | {
      status: "ready";
      embedUrl: string;
    }
  | {
      status: "externalLink";
      url: string;
    }
  | {
      status: "needsManual";
    };

export type SlidesPresentation = "embed" | "link" | "hidden";

export function parseSlideEmbed(rawUrl: string): SlideEmbed {
  const sourceUrl = rawUrl.trim();
  let url: URL;
  try {
    url = new URL(sourceUrl);
  } catch {
    return { status: "needsManual" };
  }

  const host = url.hostname.replace(/^www\./, "");

  if (host === "speakerdeck.com") {
    return parseSpeakerDeck(url);
  }
  if (host === "docswell.com") {
    return parseDocswell(url);
  }
  if (host === "docs.google.com") {
    return parseGoogleSlides(url);
  }

  return { status: "externalLink", url: sourceUrl };
}

export function toSlidesUrl(embed: SlideEmbed): string {
  if (embed.status === "ready") {
    return embed.embedUrl;
  }
  if (embed.status === "externalLink") {
    return embed.url;
  }
  return SLIDES_URL_NEEDS_MANUAL;
}

export function isEmbeddableSlidesUrl(slidesUrl: string): boolean {
  return getSlidesPresentation(slidesUrl) === "embed";
}

export function getSlidesPresentation(slidesUrl: string): SlidesPresentation {
  if (slidesUrl === SLIDES_URL_NEEDS_MANUAL) {
    return "hidden";
  }

  const parsed = parseSlideEmbed(slidesUrl);
  if (parsed.status === "ready") {
    return "embed";
  }
  if (parsed.status === "externalLink") {
    return "link";
  }

  return "hidden";
}

export function isPreservableSlidesUrl(slidesUrl: string): boolean {
  return slidesUrl !== SLIDES_URL_NEEDS_MANUAL;
}

function parseSpeakerDeck(url: URL): SlideEmbed {
  const playerMatch = url.pathname.match(/^\/player\/([A-Za-z0-9_-]+)\/?$/);
  if (playerMatch) {
    return {
      status: "ready",
      embedUrl: `https://speakerdeck.com/player/${playerMatch[1]}`,
    };
  }

  return { status: "needsManual" };
}

function parseDocswell(url: URL): SlideEmbed {
  const embedMatch = url.pathname.match(/^\/slide\/([A-Za-z0-9]+)\/embed\/?$/);
  if (embedMatch) {
    return {
      status: "ready",
      embedUrl: `https://www.docswell.com/slide/${embedMatch[1]}/embed`,
    };
  }

  const publicMatch = url.pathname.match(
    /^\/s\/[^/]+\/([A-Za-z0-9]+)(?:-[^/]*)?\/?$/,
  );
  if (publicMatch) {
    return {
      status: "ready",
      embedUrl: `https://www.docswell.com/slide/${publicMatch[1]}/embed`,
    };
  }

  return { status: "needsManual" };
}

function parseGoogleSlides(url: URL): SlideEmbed {
  const publishedMatch = url.pathname.match(
    /^\/presentation\/d\/e\/([^/]+)(?:\/.*)?$/,
  );
  if (publishedMatch) {
    return {
      status: "ready",
      embedUrl: `https://docs.google.com/presentation/d/e/${publishedMatch[1]}/embed?start=false&loop=false&delayms=3000`,
    };
  }

  const fileMatch = url.pathname.match(/^\/presentation\/d\/([^/]+)(?:\/.*)?$/);
  if (fileMatch) {
    return {
      status: "ready",
      embedUrl: `https://docs.google.com/presentation/d/${fileMatch[1]}/embed?start=false&loop=false&delayms=3000`,
    };
  }

  return { status: "needsManual" };
}
