export const trimComments = (codeAsText: string): string => {
  const reg = /#[^\n\r]+?(?:\*\)|[\n\r])/gm;

  // by convenience replacing them by a new line to avoid
  // side effect of pending comments at the end of a statement
  return codeAsText.replace(reg, '\n').trim();
};
