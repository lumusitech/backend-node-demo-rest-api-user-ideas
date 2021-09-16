const BaseService = require('./base.service')

let _ideaRepository = null

class IdeaService extends BaseService {
    constructor({ IdeaRepository }) {
        super(IdeaRepository)
        _ideaRepository = IdeaRepository
    }

    async getUserIdeas(author) {
        if (!author) {
            const error = new Error()
            error.status = 400
            error.message = 'userId must be sent'
            throw error
        }

        const currentIdeas = _ideaRepository.getAll()

        if (currentIdeas.lenght === 0) {

        }
        return _ideaRepository.getUserIdeas(author)
    }

    async upvoteIdea(ideaId) {
        if (!ideaId) {
            const error = new Error()
            error.status = 400
            error.message = 'ideaId must be sent'
            throw error
        }

        const idea = await _ideaRepository.get(ideaId)

        if (!idea) {
            const error = new Error()
            error.status = 404
            error.message = 'idea does not exists'
            throw error
        }

        idea.upvotes.push(true)

        return _ideaRepository.update(ideaId, { upvotes: idea.upvotes })
    }

    async downvoteIdea(ideaId) {
        if (!ideaId) {
            const error = new Error()
            error.status = 400
            error.message = 'ideaId must be sent'
            throw error
        }

        const idea = await _ideaRepository.get(ideaId)

        if (!idea) {
            const error = new Error()
            error.status = 404
            error.message = 'idea does not exists'
            throw error
        }

        idea.downvotes.push(true)

        return _ideaRepository.update(ideaId, { downvotes: idea.downvotes })
    }
}

module.exports = IdeaService