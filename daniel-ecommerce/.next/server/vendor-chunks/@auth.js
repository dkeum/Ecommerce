"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@auth";
exports.ids = ["vendor-chunks/@auth"];
exports.modules = {

/***/ "(rsc)/./node_modules/@auth/prisma-adapter/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@auth/prisma-adapter/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PrismaAdapter: () => (/* binding */ PrismaAdapter)\n/* harmony export */ });\n/**\n * ## Setup\n *\n * Add this adapter to your `pages/api/auth/[...nextauth].js` next-auth configuration object:\n *\n * ```js title=\"pages/api/auth/[...nextauth].js\"\n * import NextAuth from \"next-auth\"\n * import GoogleProvider from \"next-auth/providers/google\"\n * import { PrismaAdapter } from \"@auth/prisma-adapter\"\n * import { PrismaClient } from \"@prisma/client\"\n *\n * const prisma = new PrismaClient()\n *\n * export default NextAuth({\n *   adapter: PrismaAdapter(prisma),\n *   providers: [\n *     GoogleProvider({\n *       clientId: process.env.GOOGLE_CLIENT_ID,\n *       clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n *     }),\n *   ],\n * })\n * ```\n *\n * ### Create the Prisma schema from scratch\n *\n * You need to use at least Prisma 2.26.0. Create a schema file in `prisma/schema.prisma` similar to this one:\n *\n * > This schema is adapted for use in Prisma and based upon our main [schema](https://authjs.dev/reference/adapters#models)\n *\n * ```json title=\"schema.prisma\"\n * datasource db {\n *   provider = \"postgresql\"\n *   url      = env(\"DATABASE_URL\")\n *   shadowDatabaseUrl = env(\"SHADOW_DATABASE_URL\") // Only needed when using a cloud provider that doesn't support the creation of new databases, like Heroku. Learn more: https://pris.ly/d/migrate-shadow\n * }\n *\n * generator client {\n *   provider        = \"prisma-client-js\"\n *   previewFeatures = [\"referentialActions\"] // You won't need this in Prisma 3.X or higher.\n * }\n *\n * model Account {\n *   id                 String  @id @default(cuid())\n *   userId             String\n *   type               String\n *   provider           String\n *   providerAccountId  String\n *   refresh_token      String?  @db.Text\n *   access_token       String?  @db.Text\n *   expires_at         Int?\n *   token_type         String?\n *   scope              String?\n *   id_token           String?  @db.Text\n *   session_state      String?\n *\n *   user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n *\n *   @@unique([provider, providerAccountId])\n * }\n *\n * model Session {\n *   id           String   @id @default(cuid())\n *   sessionToken String   @unique\n *   userId       String\n *   expires      DateTime\n *   user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n * }\n *\n * model User {\n *   id            String    @id @default(cuid())\n *   name          String?\n *   email         String?   @unique\n *   emailVerified DateTime?\n *   image         String?\n *   accounts      Account[]\n *   sessions      Session[]\n * }\n *\n * model VerificationToken {\n *   identifier String\n *   token      String   @unique\n *   expires    DateTime\n *\n *   @@unique([identifier, token])\n * }\n * ```\n *\n * :::note\n * When using the MySQL connector for Prisma, the [Prisma `String` type](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#string) gets mapped to `varchar(191)` which may not be long enough to store fields such as `id_token` in the `Account` model. This can be avoided by explicitly using the `Text` type with `@db.Text`.\n * :::\n *\n *\n * ### Create the Prisma schema with `prisma migrate`\n *\n * This will create an SQL migration file and execute it:\n *\n * ```\n * npx prisma migrate dev\n * ```\n *\n * Note that you will need to specify your database connection string in the environment variable `DATABASE_URL`. You can do this by setting it in a `.env` file at the root of your project.\n *\n * To learn more about [Prisma Migrate](https://www.prisma.io/migrate), check out the [Migrate docs](https://www.prisma.io/docs/concepts/components/prisma-migrate).\n *\n * ### Generating the Prisma Client\n *\n * Once you have saved your schema, use the Prisma CLI to generate the Prisma Client:\n *\n * ```\n * npx prisma generate\n * ```\n *\n * To configure your database to use the new schema (i.e. create tables and columns) use the `prisma migrate` command:\n *\n * ```\n * npx prisma migrate dev\n * ```\n *\n * ### MongoDB support\n *\n * Prisma supports MongoDB, and so does Auth.js. Following the instructions of the [Prisma documentation](https://www.prisma.io/docs/concepts/database-connectors/mongodb) on the MongoDB connector, things you have to change are:\n *\n * 1. Make sure that the id fields are mapped correctly\n *\n * ```prisma\n * id  String  @id @default(auto()) @map(\"_id\") @db.ObjectId\n * ```\n *\n * 2. The Native database type attribute to `@db.String` from `@db.Text` and userId to `@db.ObjectId`.\n *\n * ```prisma\n * user_id            String   @db.ObjectId\n * refresh_token      String?  @db.String\n * access_token       String?  @db.String\n * id_token           String?  @db.String\n * ```\n *\n * Everything else should be the same.\n *\n * ### Naming Conventions\n *\n * If mixed snake_case and camelCase column names is an issue for you and/or your underlying database system, we recommend using Prisma's `@map()`([see the documentation here](https://www.prisma.io/docs/concepts/components/prisma-schema/names-in-underlying-database)) feature to change the field names. This won't affect Auth.js, but will allow you to customize the column names to whichever naming convention you wish.\n *\n * For example, moving to `snake_case` and plural table names.\n *\n * ```json title=\"schema.prisma\"\n * model Account {\n *   id                 String  @id @default(cuid())\n *   userId             String  @map(\"user_id\")\n *   type               String\n *   provider           String\n *   providerAccountId  String  @map(\"provider_account_id\")\n *   refresh_token      String? @db.Text\n *   access_token       String? @db.Text\n *   expires_at         Int?\n *   token_type         String?\n *   scope              String?\n *   id_token           String? @db.Text\n *   session_state      String?\n *\n *   user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n *\n *   @@unique([provider, providerAccountId])\n *   @@map(\"accounts\")\n * }\n *\n * model Session {\n *   id           String   @id @default(cuid())\n *   sessionToken String   @unique @map(\"session_token\")\n *   userId       String   @map(\"user_id\")\n *   expires      DateTime\n *   user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n *\n *   @@map(\"sessions\")\n * }\n *\n * model User {\n *   id            String    @id @default(cuid())\n *   name          String?\n *   email         String?   @unique\n *   emailVerified DateTime? @map(\"email_verified\")\n *   image         String?\n *   accounts      Account[]\n *   sessions      Session[]\n *\n *   @@map(\"users\")\n * }\n *\n * model VerificationToken {\n *   identifier String\n *   token      String   @unique\n *   expires    DateTime\n *\n *   @@unique([identifier, token])\n *   @@map(\"verificationtokens\")\n * }\n * ```\n *\n **/ function PrismaAdapter(p) {\n    return {\n        createUser: (data)=>p.user.create({\n                data\n            }),\n        getUser: (id)=>p.user.findUnique({\n                where: {\n                    id\n                }\n            }),\n        getUserByEmail: (email)=>p.user.findUnique({\n                where: {\n                    email\n                }\n            }),\n        async getUserByAccount (provider_providerAccountId) {\n            const account = await p.account.findUnique({\n                where: {\n                    provider_providerAccountId\n                },\n                select: {\n                    user: true\n                }\n            });\n            return account?.user ?? null;\n        },\n        updateUser: ({ id, ...data })=>p.user.update({\n                where: {\n                    id\n                },\n                data\n            }),\n        deleteUser: (id)=>p.user.delete({\n                where: {\n                    id\n                }\n            }),\n        linkAccount: (data)=>p.account.create({\n                data\n            }),\n        unlinkAccount: (provider_providerAccountId)=>p.account.delete({\n                where: {\n                    provider_providerAccountId\n                }\n            }),\n        async getSessionAndUser (sessionToken) {\n            const userAndSession = await p.session.findUnique({\n                where: {\n                    sessionToken\n                },\n                include: {\n                    user: true\n                }\n            });\n            if (!userAndSession) return null;\n            const { user, ...session } = userAndSession;\n            return {\n                user,\n                session\n            };\n        },\n        createSession: (data)=>p.session.create({\n                data\n            }),\n        updateSession: (data)=>p.session.update({\n                where: {\n                    sessionToken: data.sessionToken\n                },\n                data\n            }),\n        deleteSession: (sessionToken)=>p.session.delete({\n                where: {\n                    sessionToken\n                }\n            }),\n        async createVerificationToken (data) {\n            const verificationToken = await p.verificationToken.create({\n                data\n            });\n            // @ts-expect-errors // MongoDB needs an ID, but we don't\n            if (verificationToken.id) delete verificationToken.id;\n            return verificationToken;\n        },\n        async useVerificationToken (identifier_token) {\n            try {\n                const verificationToken = await p.verificationToken.delete({\n                    where: {\n                        identifier_token\n                    }\n                });\n                // @ts-expect-errors // MongoDB needs an ID, but we don't\n                if (verificationToken.id) delete verificationToken.id;\n                return verificationToken;\n            } catch (error) {\n                // If token already used/deleted, just return null\n                // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025\n                if (error.code === \"P2025\") return null;\n                throw error;\n            }\n        }\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvQGF1dGgvcHJpc21hLWFkYXB0ZXIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBdU1FLEdBQ0ssU0FBU0EsY0FBY0MsQ0FBQztJQUMzQixPQUFPO1FBQ0hDLFlBQVksQ0FBQ0MsT0FBU0YsRUFBRUcsSUFBSSxDQUFDQyxNQUFNLENBQUM7Z0JBQUVGO1lBQUs7UUFDM0NHLFNBQVMsQ0FBQ0MsS0FBT04sRUFBRUcsSUFBSSxDQUFDSSxVQUFVLENBQUM7Z0JBQUVDLE9BQU87b0JBQUVGO2dCQUFHO1lBQUU7UUFDbkRHLGdCQUFnQixDQUFDQyxRQUFVVixFQUFFRyxJQUFJLENBQUNJLFVBQVUsQ0FBQztnQkFBRUMsT0FBTztvQkFBRUU7Z0JBQU07WUFBRTtRQUNoRSxNQUFNQyxrQkFBaUJDLDBCQUEwQjtZQUM3QyxNQUFNQyxVQUFVLE1BQU1iLEVBQUVhLE9BQU8sQ0FBQ04sVUFBVSxDQUFDO2dCQUN2Q0MsT0FBTztvQkFBRUk7Z0JBQTJCO2dCQUNwQ0UsUUFBUTtvQkFBRVgsTUFBTTtnQkFBSztZQUN6QjtZQUNBLE9BQU9VLFNBQVNWLFFBQVE7UUFDNUI7UUFDQVksWUFBWSxDQUFDLEVBQUVULEVBQUUsRUFBRSxHQUFHSixNQUFNLEdBQUtGLEVBQUVHLElBQUksQ0FBQ2EsTUFBTSxDQUFDO2dCQUFFUixPQUFPO29CQUFFRjtnQkFBRztnQkFBR0o7WUFBSztRQUNyRWUsWUFBWSxDQUFDWCxLQUFPTixFQUFFRyxJQUFJLENBQUNlLE1BQU0sQ0FBQztnQkFBRVYsT0FBTztvQkFBRUY7Z0JBQUc7WUFBRTtRQUNsRGEsYUFBYSxDQUFDakIsT0FBU0YsRUFBRWEsT0FBTyxDQUFDVCxNQUFNLENBQUM7Z0JBQUVGO1lBQUs7UUFDL0NrQixlQUFlLENBQUNSLDZCQUErQlosRUFBRWEsT0FBTyxDQUFDSyxNQUFNLENBQUM7Z0JBQzVEVixPQUFPO29CQUFFSTtnQkFBMkI7WUFDeEM7UUFDQSxNQUFNUyxtQkFBa0JDLFlBQVk7WUFDaEMsTUFBTUMsaUJBQWlCLE1BQU12QixFQUFFd0IsT0FBTyxDQUFDakIsVUFBVSxDQUFDO2dCQUM5Q0MsT0FBTztvQkFBRWM7Z0JBQWE7Z0JBQ3RCRyxTQUFTO29CQUFFdEIsTUFBTTtnQkFBSztZQUMxQjtZQUNBLElBQUksQ0FBQ29CLGdCQUNELE9BQU87WUFDWCxNQUFNLEVBQUVwQixJQUFJLEVBQUUsR0FBR3FCLFNBQVMsR0FBR0Q7WUFDN0IsT0FBTztnQkFBRXBCO2dCQUFNcUI7WUFBUTtRQUMzQjtRQUNBRSxlQUFlLENBQUN4QixPQUFTRixFQUFFd0IsT0FBTyxDQUFDcEIsTUFBTSxDQUFDO2dCQUFFRjtZQUFLO1FBQ2pEeUIsZUFBZSxDQUFDekIsT0FBU0YsRUFBRXdCLE9BQU8sQ0FBQ1IsTUFBTSxDQUFDO2dCQUFFUixPQUFPO29CQUFFYyxjQUFjcEIsS0FBS29CLFlBQVk7Z0JBQUM7Z0JBQUdwQjtZQUFLO1FBQzdGMEIsZUFBZSxDQUFDTixlQUFpQnRCLEVBQUV3QixPQUFPLENBQUNOLE1BQU0sQ0FBQztnQkFBRVYsT0FBTztvQkFBRWM7Z0JBQWE7WUFBRTtRQUM1RSxNQUFNTyx5QkFBd0IzQixJQUFJO1lBQzlCLE1BQU00QixvQkFBb0IsTUFBTTlCLEVBQUU4QixpQkFBaUIsQ0FBQzFCLE1BQU0sQ0FBQztnQkFBRUY7WUFBSztZQUNsRSx5REFBeUQ7WUFDekQsSUFBSTRCLGtCQUFrQnhCLEVBQUUsRUFDcEIsT0FBT3dCLGtCQUFrQnhCLEVBQUU7WUFDL0IsT0FBT3dCO1FBQ1g7UUFDQSxNQUFNQyxzQkFBcUJDLGdCQUFnQjtZQUN2QyxJQUFJO2dCQUNBLE1BQU1GLG9CQUFvQixNQUFNOUIsRUFBRThCLGlCQUFpQixDQUFDWixNQUFNLENBQUM7b0JBQ3ZEVixPQUFPO3dCQUFFd0I7b0JBQWlCO2dCQUM5QjtnQkFDQSx5REFBeUQ7Z0JBQ3pELElBQUlGLGtCQUFrQnhCLEVBQUUsRUFDcEIsT0FBT3dCLGtCQUFrQnhCLEVBQUU7Z0JBQy9CLE9BQU93QjtZQUNYLEVBQ0EsT0FBT0csT0FBTztnQkFDVixrREFBa0Q7Z0JBQ2xELDJFQUEyRTtnQkFDM0UsSUFBSUEsTUFBTUMsSUFBSSxLQUFLLFNBQ2YsT0FBTztnQkFDWCxNQUFNRDtZQUNWO1FBQ0o7SUFDSjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGFuaWVsLWVjb21tZXJjZS8uL25vZGVfbW9kdWxlcy9AYXV0aC9wcmlzbWEtYWRhcHRlci9pbmRleC5qcz81ODE4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyMgU2V0dXBcbiAqXG4gKiBBZGQgdGhpcyBhZGFwdGVyIHRvIHlvdXIgYHBhZ2VzL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0uanNgIG5leHQtYXV0aCBjb25maWd1cmF0aW9uIG9iamVjdDpcbiAqXG4gKiBgYGBqcyB0aXRsZT1cInBhZ2VzL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0uanNcIlxuICogaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIlxuICogaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZVwiXG4gKiBpbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSBcIkBhdXRoL3ByaXNtYS1hZGFwdGVyXCJcbiAqIGltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiXG4gKlxuICogY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXG4gKlxuICogZXhwb3J0IGRlZmF1bHQgTmV4dEF1dGgoe1xuICogICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXG4gKiAgIHByb3ZpZGVyczogW1xuICogICAgIEdvb2dsZVByb3ZpZGVyKHtcbiAqICAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lELFxuICogICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCxcbiAqICAgICB9KSxcbiAqICAgXSxcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiAjIyMgQ3JlYXRlIHRoZSBQcmlzbWEgc2NoZW1hIGZyb20gc2NyYXRjaFxuICpcbiAqIFlvdSBuZWVkIHRvIHVzZSBhdCBsZWFzdCBQcmlzbWEgMi4yNi4wLiBDcmVhdGUgYSBzY2hlbWEgZmlsZSBpbiBgcHJpc21hL3NjaGVtYS5wcmlzbWFgIHNpbWlsYXIgdG8gdGhpcyBvbmU6XG4gKlxuICogPiBUaGlzIHNjaGVtYSBpcyBhZGFwdGVkIGZvciB1c2UgaW4gUHJpc21hIGFuZCBiYXNlZCB1cG9uIG91ciBtYWluIFtzY2hlbWFdKGh0dHBzOi8vYXV0aGpzLmRldi9yZWZlcmVuY2UvYWRhcHRlcnMjbW9kZWxzKVxuICpcbiAqIGBgYGpzb24gdGl0bGU9XCJzY2hlbWEucHJpc21hXCJcbiAqIGRhdGFzb3VyY2UgZGIge1xuICogICBwcm92aWRlciA9IFwicG9zdGdyZXNxbFwiXG4gKiAgIHVybCAgICAgID0gZW52KFwiREFUQUJBU0VfVVJMXCIpXG4gKiAgIHNoYWRvd0RhdGFiYXNlVXJsID0gZW52KFwiU0hBRE9XX0RBVEFCQVNFX1VSTFwiKSAvLyBPbmx5IG5lZWRlZCB3aGVuIHVzaW5nIGEgY2xvdWQgcHJvdmlkZXIgdGhhdCBkb2Vzbid0IHN1cHBvcnQgdGhlIGNyZWF0aW9uIG9mIG5ldyBkYXRhYmFzZXMsIGxpa2UgSGVyb2t1LiBMZWFybiBtb3JlOiBodHRwczovL3ByaXMubHkvZC9taWdyYXRlLXNoYWRvd1xuICogfVxuICpcbiAqIGdlbmVyYXRvciBjbGllbnQge1xuICogICBwcm92aWRlciAgICAgICAgPSBcInByaXNtYS1jbGllbnQtanNcIlxuICogICBwcmV2aWV3RmVhdHVyZXMgPSBbXCJyZWZlcmVudGlhbEFjdGlvbnNcIl0gLy8gWW91IHdvbid0IG5lZWQgdGhpcyBpbiBQcmlzbWEgMy5YIG9yIGhpZ2hlci5cbiAqIH1cbiAqXG4gKiBtb2RlbCBBY2NvdW50IHtcbiAqICAgaWQgICAgICAgICAgICAgICAgIFN0cmluZyAgQGlkIEBkZWZhdWx0KGN1aWQoKSlcbiAqICAgdXNlcklkICAgICAgICAgICAgIFN0cmluZ1xuICogICB0eXBlICAgICAgICAgICAgICAgU3RyaW5nXG4gKiAgIHByb3ZpZGVyICAgICAgICAgICBTdHJpbmdcbiAqICAgcHJvdmlkZXJBY2NvdW50SWQgIFN0cmluZ1xuICogICByZWZyZXNoX3Rva2VuICAgICAgU3RyaW5nPyAgQGRiLlRleHRcbiAqICAgYWNjZXNzX3Rva2VuICAgICAgIFN0cmluZz8gIEBkYi5UZXh0XG4gKiAgIGV4cGlyZXNfYXQgICAgICAgICBJbnQ/XG4gKiAgIHRva2VuX3R5cGUgICAgICAgICBTdHJpbmc/XG4gKiAgIHNjb3BlICAgICAgICAgICAgICBTdHJpbmc/XG4gKiAgIGlkX3Rva2VuICAgICAgICAgICBTdHJpbmc/ICBAZGIuVGV4dFxuICogICBzZXNzaW9uX3N0YXRlICAgICAgU3RyaW5nP1xuICpcbiAqICAgdXNlciBVc2VyIEByZWxhdGlvbihmaWVsZHM6IFt1c2VySWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSlcbiAqXG4gKiAgIEBAdW5pcXVlKFtwcm92aWRlciwgcHJvdmlkZXJBY2NvdW50SWRdKVxuICogfVxuICpcbiAqIG1vZGVsIFNlc3Npb24ge1xuICogICBpZCAgICAgICAgICAgU3RyaW5nICAgQGlkIEBkZWZhdWx0KGN1aWQoKSlcbiAqICAgc2Vzc2lvblRva2VuIFN0cmluZyAgIEB1bmlxdWVcbiAqICAgdXNlcklkICAgICAgIFN0cmluZ1xuICogICBleHBpcmVzICAgICAgRGF0ZVRpbWVcbiAqICAgdXNlciAgICAgICAgIFVzZXIgICAgIEByZWxhdGlvbihmaWVsZHM6IFt1c2VySWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSlcbiAqIH1cbiAqXG4gKiBtb2RlbCBVc2VyIHtcbiAqICAgaWQgICAgICAgICAgICBTdHJpbmcgICAgQGlkIEBkZWZhdWx0KGN1aWQoKSlcbiAqICAgbmFtZSAgICAgICAgICBTdHJpbmc/XG4gKiAgIGVtYWlsICAgICAgICAgU3RyaW5nPyAgIEB1bmlxdWVcbiAqICAgZW1haWxWZXJpZmllZCBEYXRlVGltZT9cbiAqICAgaW1hZ2UgICAgICAgICBTdHJpbmc/XG4gKiAgIGFjY291bnRzICAgICAgQWNjb3VudFtdXG4gKiAgIHNlc3Npb25zICAgICAgU2Vzc2lvbltdXG4gKiB9XG4gKlxuICogbW9kZWwgVmVyaWZpY2F0aW9uVG9rZW4ge1xuICogICBpZGVudGlmaWVyIFN0cmluZ1xuICogICB0b2tlbiAgICAgIFN0cmluZyAgIEB1bmlxdWVcbiAqICAgZXhwaXJlcyAgICBEYXRlVGltZVxuICpcbiAqICAgQEB1bmlxdWUoW2lkZW50aWZpZXIsIHRva2VuXSlcbiAqIH1cbiAqIGBgYFxuICpcbiAqIDo6Om5vdGVcbiAqIFdoZW4gdXNpbmcgdGhlIE15U1FMIGNvbm5lY3RvciBmb3IgUHJpc21hLCB0aGUgW1ByaXNtYSBgU3RyaW5nYCB0eXBlXShodHRwczovL3d3dy5wcmlzbWEuaW8vZG9jcy9yZWZlcmVuY2UvYXBpLXJlZmVyZW5jZS9wcmlzbWEtc2NoZW1hLXJlZmVyZW5jZSNzdHJpbmcpIGdldHMgbWFwcGVkIHRvIGB2YXJjaGFyKDE5MSlgIHdoaWNoIG1heSBub3QgYmUgbG9uZyBlbm91Z2ggdG8gc3RvcmUgZmllbGRzIHN1Y2ggYXMgYGlkX3Rva2VuYCBpbiB0aGUgYEFjY291bnRgIG1vZGVsLiBUaGlzIGNhbiBiZSBhdm9pZGVkIGJ5IGV4cGxpY2l0bHkgdXNpbmcgdGhlIGBUZXh0YCB0eXBlIHdpdGggYEBkYi5UZXh0YC5cbiAqIDo6OlxuICpcbiAqXG4gKiAjIyMgQ3JlYXRlIHRoZSBQcmlzbWEgc2NoZW1hIHdpdGggYHByaXNtYSBtaWdyYXRlYFxuICpcbiAqIFRoaXMgd2lsbCBjcmVhdGUgYW4gU1FMIG1pZ3JhdGlvbiBmaWxlIGFuZCBleGVjdXRlIGl0OlxuICpcbiAqIGBgYFxuICogbnB4IHByaXNtYSBtaWdyYXRlIGRldlxuICogYGBgXG4gKlxuICogTm90ZSB0aGF0IHlvdSB3aWxsIG5lZWQgdG8gc3BlY2lmeSB5b3VyIGRhdGFiYXNlIGNvbm5lY3Rpb24gc3RyaW5nIGluIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZSBgREFUQUJBU0VfVVJMYC4gWW91IGNhbiBkbyB0aGlzIGJ5IHNldHRpbmcgaXQgaW4gYSBgLmVudmAgZmlsZSBhdCB0aGUgcm9vdCBvZiB5b3VyIHByb2plY3QuXG4gKlxuICogVG8gbGVhcm4gbW9yZSBhYm91dCBbUHJpc21hIE1pZ3JhdGVdKGh0dHBzOi8vd3d3LnByaXNtYS5pby9taWdyYXRlKSwgY2hlY2sgb3V0IHRoZSBbTWlncmF0ZSBkb2NzXShodHRwczovL3d3dy5wcmlzbWEuaW8vZG9jcy9jb25jZXB0cy9jb21wb25lbnRzL3ByaXNtYS1taWdyYXRlKS5cbiAqXG4gKiAjIyMgR2VuZXJhdGluZyB0aGUgUHJpc21hIENsaWVudFxuICpcbiAqIE9uY2UgeW91IGhhdmUgc2F2ZWQgeW91ciBzY2hlbWEsIHVzZSB0aGUgUHJpc21hIENMSSB0byBnZW5lcmF0ZSB0aGUgUHJpc21hIENsaWVudDpcbiAqXG4gKiBgYGBcbiAqIG5weCBwcmlzbWEgZ2VuZXJhdGVcbiAqIGBgYFxuICpcbiAqIFRvIGNvbmZpZ3VyZSB5b3VyIGRhdGFiYXNlIHRvIHVzZSB0aGUgbmV3IHNjaGVtYSAoaS5lLiBjcmVhdGUgdGFibGVzIGFuZCBjb2x1bW5zKSB1c2UgdGhlIGBwcmlzbWEgbWlncmF0ZWAgY29tbWFuZDpcbiAqXG4gKiBgYGBcbiAqIG5weCBwcmlzbWEgbWlncmF0ZSBkZXZcbiAqIGBgYFxuICpcbiAqICMjIyBNb25nb0RCIHN1cHBvcnRcbiAqXG4gKiBQcmlzbWEgc3VwcG9ydHMgTW9uZ29EQiwgYW5kIHNvIGRvZXMgQXV0aC5qcy4gRm9sbG93aW5nIHRoZSBpbnN0cnVjdGlvbnMgb2YgdGhlIFtQcmlzbWEgZG9jdW1lbnRhdGlvbl0oaHR0cHM6Ly93d3cucHJpc21hLmlvL2RvY3MvY29uY2VwdHMvZGF0YWJhc2UtY29ubmVjdG9ycy9tb25nb2RiKSBvbiB0aGUgTW9uZ29EQiBjb25uZWN0b3IsIHRoaW5ncyB5b3UgaGF2ZSB0byBjaGFuZ2UgYXJlOlxuICpcbiAqIDEuIE1ha2Ugc3VyZSB0aGF0IHRoZSBpZCBmaWVsZHMgYXJlIG1hcHBlZCBjb3JyZWN0bHlcbiAqXG4gKiBgYGBwcmlzbWFcbiAqIGlkICBTdHJpbmcgIEBpZCBAZGVmYXVsdChhdXRvKCkpIEBtYXAoXCJfaWRcIikgQGRiLk9iamVjdElkXG4gKiBgYGBcbiAqXG4gKiAyLiBUaGUgTmF0aXZlIGRhdGFiYXNlIHR5cGUgYXR0cmlidXRlIHRvIGBAZGIuU3RyaW5nYCBmcm9tIGBAZGIuVGV4dGAgYW5kIHVzZXJJZCB0byBgQGRiLk9iamVjdElkYC5cbiAqXG4gKiBgYGBwcmlzbWFcbiAqIHVzZXJfaWQgICAgICAgICAgICBTdHJpbmcgICBAZGIuT2JqZWN0SWRcbiAqIHJlZnJlc2hfdG9rZW4gICAgICBTdHJpbmc/ICBAZGIuU3RyaW5nXG4gKiBhY2Nlc3NfdG9rZW4gICAgICAgU3RyaW5nPyAgQGRiLlN0cmluZ1xuICogaWRfdG9rZW4gICAgICAgICAgIFN0cmluZz8gIEBkYi5TdHJpbmdcbiAqIGBgYFxuICpcbiAqIEV2ZXJ5dGhpbmcgZWxzZSBzaG91bGQgYmUgdGhlIHNhbWUuXG4gKlxuICogIyMjIE5hbWluZyBDb252ZW50aW9uc1xuICpcbiAqIElmIG1peGVkIHNuYWtlX2Nhc2UgYW5kIGNhbWVsQ2FzZSBjb2x1bW4gbmFtZXMgaXMgYW4gaXNzdWUgZm9yIHlvdSBhbmQvb3IgeW91ciB1bmRlcmx5aW5nIGRhdGFiYXNlIHN5c3RlbSwgd2UgcmVjb21tZW5kIHVzaW5nIFByaXNtYSdzIGBAbWFwKClgKFtzZWUgdGhlIGRvY3VtZW50YXRpb24gaGVyZV0oaHR0cHM6Ly93d3cucHJpc21hLmlvL2RvY3MvY29uY2VwdHMvY29tcG9uZW50cy9wcmlzbWEtc2NoZW1hL25hbWVzLWluLXVuZGVybHlpbmctZGF0YWJhc2UpKSBmZWF0dXJlIHRvIGNoYW5nZSB0aGUgZmllbGQgbmFtZXMuIFRoaXMgd29uJ3QgYWZmZWN0IEF1dGguanMsIGJ1dCB3aWxsIGFsbG93IHlvdSB0byBjdXN0b21pemUgdGhlIGNvbHVtbiBuYW1lcyB0byB3aGljaGV2ZXIgbmFtaW5nIGNvbnZlbnRpb24geW91IHdpc2guXG4gKlxuICogRm9yIGV4YW1wbGUsIG1vdmluZyB0byBgc25ha2VfY2FzZWAgYW5kIHBsdXJhbCB0YWJsZSBuYW1lcy5cbiAqXG4gKiBgYGBqc29uIHRpdGxlPVwic2NoZW1hLnByaXNtYVwiXG4gKiBtb2RlbCBBY2NvdW50IHtcbiAqICAgaWQgICAgICAgICAgICAgICAgIFN0cmluZyAgQGlkIEBkZWZhdWx0KGN1aWQoKSlcbiAqICAgdXNlcklkICAgICAgICAgICAgIFN0cmluZyAgQG1hcChcInVzZXJfaWRcIilcbiAqICAgdHlwZSAgICAgICAgICAgICAgIFN0cmluZ1xuICogICBwcm92aWRlciAgICAgICAgICAgU3RyaW5nXG4gKiAgIHByb3ZpZGVyQWNjb3VudElkICBTdHJpbmcgIEBtYXAoXCJwcm92aWRlcl9hY2NvdW50X2lkXCIpXG4gKiAgIHJlZnJlc2hfdG9rZW4gICAgICBTdHJpbmc/IEBkYi5UZXh0XG4gKiAgIGFjY2Vzc190b2tlbiAgICAgICBTdHJpbmc/IEBkYi5UZXh0XG4gKiAgIGV4cGlyZXNfYXQgICAgICAgICBJbnQ/XG4gKiAgIHRva2VuX3R5cGUgICAgICAgICBTdHJpbmc/XG4gKiAgIHNjb3BlICAgICAgICAgICAgICBTdHJpbmc/XG4gKiAgIGlkX3Rva2VuICAgICAgICAgICBTdHJpbmc/IEBkYi5UZXh0XG4gKiAgIHNlc3Npb25fc3RhdGUgICAgICBTdHJpbmc/XG4gKlxuICogICB1c2VyIFVzZXIgQHJlbGF0aW9uKGZpZWxkczogW3VzZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBDYXNjYWRlKVxuICpcbiAqICAgQEB1bmlxdWUoW3Byb3ZpZGVyLCBwcm92aWRlckFjY291bnRJZF0pXG4gKiAgIEBAbWFwKFwiYWNjb3VudHNcIilcbiAqIH1cbiAqXG4gKiBtb2RlbCBTZXNzaW9uIHtcbiAqICAgaWQgICAgICAgICAgIFN0cmluZyAgIEBpZCBAZGVmYXVsdChjdWlkKCkpXG4gKiAgIHNlc3Npb25Ub2tlbiBTdHJpbmcgICBAdW5pcXVlIEBtYXAoXCJzZXNzaW9uX3Rva2VuXCIpXG4gKiAgIHVzZXJJZCAgICAgICBTdHJpbmcgICBAbWFwKFwidXNlcl9pZFwiKVxuICogICBleHBpcmVzICAgICAgRGF0ZVRpbWVcbiAqICAgdXNlciAgICAgICAgIFVzZXIgICAgIEByZWxhdGlvbihmaWVsZHM6IFt1c2VySWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSlcbiAqXG4gKiAgIEBAbWFwKFwic2Vzc2lvbnNcIilcbiAqIH1cbiAqXG4gKiBtb2RlbCBVc2VyIHtcbiAqICAgaWQgICAgICAgICAgICBTdHJpbmcgICAgQGlkIEBkZWZhdWx0KGN1aWQoKSlcbiAqICAgbmFtZSAgICAgICAgICBTdHJpbmc/XG4gKiAgIGVtYWlsICAgICAgICAgU3RyaW5nPyAgIEB1bmlxdWVcbiAqICAgZW1haWxWZXJpZmllZCBEYXRlVGltZT8gQG1hcChcImVtYWlsX3ZlcmlmaWVkXCIpXG4gKiAgIGltYWdlICAgICAgICAgU3RyaW5nP1xuICogICBhY2NvdW50cyAgICAgIEFjY291bnRbXVxuICogICBzZXNzaW9ucyAgICAgIFNlc3Npb25bXVxuICpcbiAqICAgQEBtYXAoXCJ1c2Vyc1wiKVxuICogfVxuICpcbiAqIG1vZGVsIFZlcmlmaWNhdGlvblRva2VuIHtcbiAqICAgaWRlbnRpZmllciBTdHJpbmdcbiAqICAgdG9rZW4gICAgICBTdHJpbmcgICBAdW5pcXVlXG4gKiAgIGV4cGlyZXMgICAgRGF0ZVRpbWVcbiAqXG4gKiAgIEBAdW5pcXVlKFtpZGVudGlmaWVyLCB0b2tlbl0pXG4gKiAgIEBAbWFwKFwidmVyaWZpY2F0aW9udG9rZW5zXCIpXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiovXG5leHBvcnQgZnVuY3Rpb24gUHJpc21hQWRhcHRlcihwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlVXNlcjogKGRhdGEpID0+IHAudXNlci5jcmVhdGUoeyBkYXRhIH0pLFxuICAgICAgICBnZXRVc2VyOiAoaWQpID0+IHAudXNlci5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQgfSB9KSxcbiAgICAgICAgZ2V0VXNlckJ5RW1haWw6IChlbWFpbCkgPT4gcC51c2VyLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBlbWFpbCB9IH0pLFxuICAgICAgICBhc3luYyBnZXRVc2VyQnlBY2NvdW50KHByb3ZpZGVyX3Byb3ZpZGVyQWNjb3VudElkKSB7XG4gICAgICAgICAgICBjb25zdCBhY2NvdW50ID0gYXdhaXQgcC5hY2NvdW50LmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHByb3ZpZGVyX3Byb3ZpZGVyQWNjb3VudElkIH0sXG4gICAgICAgICAgICAgICAgc2VsZWN0OiB7IHVzZXI6IHRydWUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGFjY291bnQ/LnVzZXIgPz8gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlVXNlcjogKHsgaWQsIC4uLmRhdGEgfSkgPT4gcC51c2VyLnVwZGF0ZSh7IHdoZXJlOiB7IGlkIH0sIGRhdGEgfSksXG4gICAgICAgIGRlbGV0ZVVzZXI6IChpZCkgPT4gcC51c2VyLmRlbGV0ZSh7IHdoZXJlOiB7IGlkIH0gfSksXG4gICAgICAgIGxpbmtBY2NvdW50OiAoZGF0YSkgPT4gcC5hY2NvdW50LmNyZWF0ZSh7IGRhdGEgfSksXG4gICAgICAgIHVubGlua0FjY291bnQ6IChwcm92aWRlcl9wcm92aWRlckFjY291bnRJZCkgPT4gcC5hY2NvdW50LmRlbGV0ZSh7XG4gICAgICAgICAgICB3aGVyZTogeyBwcm92aWRlcl9wcm92aWRlckFjY291bnRJZCB9LFxuICAgICAgICB9KSxcbiAgICAgICAgYXN5bmMgZ2V0U2Vzc2lvbkFuZFVzZXIoc2Vzc2lvblRva2VuKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyQW5kU2Vzc2lvbiA9IGF3YWl0IHAuc2Vzc2lvbi5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBzZXNzaW9uVG9rZW4gfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7IHVzZXI6IHRydWUgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCF1c2VyQW5kU2Vzc2lvbilcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IHsgdXNlciwgLi4uc2Vzc2lvbiB9ID0gdXNlckFuZFNlc3Npb247XG4gICAgICAgICAgICByZXR1cm4geyB1c2VyLCBzZXNzaW9uIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZVNlc3Npb246IChkYXRhKSA9PiBwLnNlc3Npb24uY3JlYXRlKHsgZGF0YSB9KSxcbiAgICAgICAgdXBkYXRlU2Vzc2lvbjogKGRhdGEpID0+IHAuc2Vzc2lvbi51cGRhdGUoeyB3aGVyZTogeyBzZXNzaW9uVG9rZW46IGRhdGEuc2Vzc2lvblRva2VuIH0sIGRhdGEgfSksXG4gICAgICAgIGRlbGV0ZVNlc3Npb246IChzZXNzaW9uVG9rZW4pID0+IHAuc2Vzc2lvbi5kZWxldGUoeyB3aGVyZTogeyBzZXNzaW9uVG9rZW4gfSB9KSxcbiAgICAgICAgYXN5bmMgY3JlYXRlVmVyaWZpY2F0aW9uVG9rZW4oZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgdmVyaWZpY2F0aW9uVG9rZW4gPSBhd2FpdCBwLnZlcmlmaWNhdGlvblRva2VuLmNyZWF0ZSh7IGRhdGEgfSk7XG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9ycyAvLyBNb25nb0RCIG5lZWRzIGFuIElELCBidXQgd2UgZG9uJ3RcbiAgICAgICAgICAgIGlmICh2ZXJpZmljYXRpb25Ub2tlbi5pZClcbiAgICAgICAgICAgICAgICBkZWxldGUgdmVyaWZpY2F0aW9uVG9rZW4uaWQ7XG4gICAgICAgICAgICByZXR1cm4gdmVyaWZpY2F0aW9uVG9rZW47XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIHVzZVZlcmlmaWNhdGlvblRva2VuKGlkZW50aWZpZXJfdG9rZW4pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmVyaWZpY2F0aW9uVG9rZW4gPSBhd2FpdCBwLnZlcmlmaWNhdGlvblRva2VuLmRlbGV0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkZW50aWZpZXJfdG9rZW4gfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9ycyAvLyBNb25nb0RCIG5lZWRzIGFuIElELCBidXQgd2UgZG9uJ3RcbiAgICAgICAgICAgICAgICBpZiAodmVyaWZpY2F0aW9uVG9rZW4uaWQpXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB2ZXJpZmljYXRpb25Ub2tlbi5pZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmVyaWZpY2F0aW9uVG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0b2tlbiBhbHJlYWR5IHVzZWQvZGVsZXRlZCwganVzdCByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LnByaXNtYS5pby9kb2NzL3JlZmVyZW5jZS9hcGktcmVmZXJlbmNlL2Vycm9yLXJlZmVyZW5jZSNwMjAyNVxuICAgICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSBcIlAyMDI1XCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG4iXSwibmFtZXMiOlsiUHJpc21hQWRhcHRlciIsInAiLCJjcmVhdGVVc2VyIiwiZGF0YSIsInVzZXIiLCJjcmVhdGUiLCJnZXRVc2VyIiwiaWQiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJnZXRVc2VyQnlFbWFpbCIsImVtYWlsIiwiZ2V0VXNlckJ5QWNjb3VudCIsInByb3ZpZGVyX3Byb3ZpZGVyQWNjb3VudElkIiwiYWNjb3VudCIsInNlbGVjdCIsInVwZGF0ZVVzZXIiLCJ1cGRhdGUiLCJkZWxldGVVc2VyIiwiZGVsZXRlIiwibGlua0FjY291bnQiLCJ1bmxpbmtBY2NvdW50IiwiZ2V0U2Vzc2lvbkFuZFVzZXIiLCJzZXNzaW9uVG9rZW4iLCJ1c2VyQW5kU2Vzc2lvbiIsInNlc3Npb24iLCJpbmNsdWRlIiwiY3JlYXRlU2Vzc2lvbiIsInVwZGF0ZVNlc3Npb24iLCJkZWxldGVTZXNzaW9uIiwiY3JlYXRlVmVyaWZpY2F0aW9uVG9rZW4iLCJ2ZXJpZmljYXRpb25Ub2tlbiIsInVzZVZlcmlmaWNhdGlvblRva2VuIiwiaWRlbnRpZmllcl90b2tlbiIsImVycm9yIiwiY29kZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/@auth/prisma-adapter/index.js\n");

/***/ })

};
;