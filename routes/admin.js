const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

const mongoose = require('mongoose')
AdminBro.registerAdapter(AdminBroMongoose)

const User = require('../models/User')
const Post = require('../models/Post')
const UserProfile = require('../models/UserProfile')


const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin',
    branding: {
        companyName: "Blog App",
        //logo: "C:/Users/Shebo/Desktop/Flutter Apps/Blog App/Blog Server/uploads/1598544944343.png"
    },
    resources: [
        {
            resource: User,
            options: {
                parent: {
                    name: 'Main Components',
                    icon: 'fas fa-cogs',
                }
            }
        },
        {
            resource: Post,
            options: {
                parent: {
                    name: 'Main Components',
                    icon: 'fas fa-cogs',
                },
                properties: {
                    content: {
                        type: 'richtext',
                    }
                }
            }
        },
        {
            resource: UserProfile,
            options: {
                parent: {
                    name: 'Main Components',
                    icon: 'fas fa-cogs',
                }
            }
        }
    ]
})

const router = AdminBroExpress.buildRouter(adminBro)

module.exports = router