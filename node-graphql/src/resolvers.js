const { prisma } = require('./database.js')

const resolvers = {
  Student: {
    id: (parent, args, context, info) => parent.id,
    email: (parent) => parent.email,
    fullName: (parent) => parent.fullName,
    dept: (parent) => parent.dept,
    enrolled: (parent) => parent.enrolled
  },

  Query: {
    enrolled: (parent, args) => {
      return prisma.student.findMany({
        where: { enrolled: true }
      })
    },
    students: (parent, args) => {
      return prisma.student.findMany()
    },
    notEnrolled: (parent, args) => {
      return prisma.student.findMany({
        where: { enrolled: false }
      })
    },
    student: (parent, args) => {
      return prisma.student.findFirst({
        where: { id: Number(args.id) }
      })
    }
  },

  Mutation: {
    registerStudent: (parent, args) => {
      return prisma.student.create({
        data: {
          email: args.email,
          dept: args.dept,
          fullName: args.fullName
        }
      })
    },
    enroll: (parent, args) => {
      return prisma.student.update({
        where: {
          id: Number(args.id)
        },
        data: {
          enrolled: true
        }
      })
    }
  }
}

module.exports = {
  resolvers
}
