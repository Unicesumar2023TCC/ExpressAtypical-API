const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = class Category {

    static async getCategoriesByUserId(id){
        return await prisma.category.findMany({
            where: {
                idUser: parseInt(id),
                deleted: false,
                status: 'ACTIVE'
            }
        });
    }

    static async getCategorieById(id){
        return await prisma.category.findUnique({
            where: {
                id: parseInt(id)
            }
        });
    }

    static async getCategoryByNameAndUser(data){
        return await prisma.category.findMany({
            where: {
                idUser: parseInt(data.idUser),
                name: data.name,
                deleted: false,
                status: 'ACTIVE'
            }
        });
    }

    static async insertNewCategory(data){
        return await prisma.category.create({
            data: {
                idProfile: parseInt(data.idProfile),
                idUser: parseInt(data.idUser),
                name: data.name,
                imageUrl: data.imageUrl,
                voiceUrl: data.voiceUrl
            }
        })
    }

    static async updateCategory(data){
        return await prisma.category.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                name: data.name,
                status: data.status,
                imageUrl: data.imageUrl,
                voiceUrl: data.voiceUrl
            }
        })
    }

    static async deleteCategoryById(id){
        return await prisma.category.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status: 'DISABLE',
                deleted: true
            }
        })
    }
}