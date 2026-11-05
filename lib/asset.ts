/** Caminhos que começam por "/" (pasta public) precisam do prefixo do GitHub Pages. */
export const asset = (src: string) => (src.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}` : src);
