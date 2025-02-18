import { createId } from "@paralleldrive/cuid2";
import { relations, Relations } from "drizzle-orm";
import {
    integer,
    primaryKey,
    sqliteTable,
    text,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text("name").notNull(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    password: text("password").notNull(),
    image: text("image"),
});

export const accounts = sqliteTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const sessions = sqliteTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);

export const blogs = sqliteTable("blogs", {
    authorId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    title: text("text").notNull(),
    description: text("text").notNull(),
    banner: text("banner"),
    content: text("text", { mode: "json" }).notNull(),
    tags: text("tags").$type<string[]>(),
});

export const usersRelations: Relations = relations(users, ({ many }) => ({
    blogs: many(blogs),
}));

export const blogsRelations: Relations = relations(blogs, ({ one }) => ({
    author: one(users, { fields: [blogs.authorId], references: [users.id] }),
}));
