interface RenderableError {
  _renderableError: true;
  code(): string;
  renderMessage(): string;
  context(): object;
  devMessage(): string;
}

export default RenderableError;
