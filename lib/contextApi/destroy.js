/* Context do not prepagate its destroy */
module.exports = function destroy() {
  if (this.parent) {
    this.parent.removeChild(this);
    this.parent = null;
  }
};
