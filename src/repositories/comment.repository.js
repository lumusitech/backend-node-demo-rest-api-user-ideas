const BaseRepository = require('./base.repository')

let _comment = null

class CommentRepository extends BaseRepository {
    constructor({ Comment }) {
        super(Comment)
        _comment = Comment
    }

    async getByAuthor(author) {
        return await _comment.find({ author })
    }
}

module.exports = CommentRepository