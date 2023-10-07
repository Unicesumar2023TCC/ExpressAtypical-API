const WordModel = require('../models/word');
const UserController = require('./user') 
const CategoryController = require('./category') 


module.exports = class Word {

    static async getWordsByCategoryId(idCategory, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            if (!idCategory) {
                throw new Error('ID do usuário é obrigatório');
            }
            
            const authenticatedUser = await UserController.getUserById(authenticatedId)

            const category = await CategoryController.getcategorieById(idCategory)

            if(authenticatedUser.id != category.idUser && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            return await WordModel.getWordsByCategoryId(id);
        } catch (error) {
            throw new Error(`Erro ao buscar palavras por categoria: ${error.message}`);
        }
    }

    static async insertNewWord(data){
        try {
            if (!data.name) {
                throw new Error('Nome da palavra é obrigatório');
            }

           if(await this.checkIfWordExist(data)){
                throw new Error('Palavra já existe para esta categoria');
            }
    
            return await WordModel.insertNewWord(data);
        } catch (error) {
            throw new Error(`Erro ao inserir nova palavra: ${error.message}`);
        }
    }

    static async checkIfWordExist(data){
        return Boolean((await WordModel.getWordByNameAndCategory(data)).length)
    }

    static async updateWordById(data, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }
          
            const authenticatedUser = await UserController.getUserById(authenticatedId)

            if(authenticatedUser.id != data.id && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            return await WordModel.updateWordById(data);
        } catch (error) {
            throw new Error(`Erro ao atualizar palavra: ${error.message}`);
        }
    }

    static async deleteWordById(id, authenticatedId){
        try {
            if (!authenticatedId) {
                throw new Error('Usuário não autenticado');
            }

            if (!id) {
                throw new Error('ID do usuário é obrigatório');
            }
            
            const authenticatedUser = await UserController.getUserById(authenticatedId)

            if(authenticatedUser.id != id && authenticatedUser.type != 'Admin'){
                throw new Error('Usuário não autorizado')
            }

            return await WordModel.deleteWordById(id);
        } catch (error) {
            throw new Error(`Erro ao excluir palavra: ${error.message}`);
        }
    }
}

    
