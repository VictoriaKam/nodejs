const { v4: uuid } = require('uuid');

/** Class representing a board. */
class Board {
  /**
     * Create a board.
     * @param {String} id - The id value.
     * @param {String} title - The title value.
     * @param {Array.<object>} columns - The columns value.
     * @param {String} columns.id - The columns id.
     * @param {String} columns.title - The columns title.
     * @param {Number} columns.order - The columns order.
     */
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = [
      {
        id: "string",
        title: "string",
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
    * Returns a board with all data.
    * @param {Board} board - An object containing id, title and columns data.
    * @return {Board} A Board object.
  */
  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
