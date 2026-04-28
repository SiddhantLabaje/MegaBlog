import conf from "../conf/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // ─── DATABASE ────────────────────────────────────────────────────────────

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.error('[createPost]', error.message);
            return false;
        }
    }

    async upadatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            console.error('[upadatePost]', error.message);
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error('[deletePost]', error.message);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error('[getPost]', error.message);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error('[getPosts]', error.message);
            return false;
        }
    }

    // ─── STORAGE ─────────────────────────────────────────────────────────────

    async uploadFile(file) {
        try {
            console.log('[uploadFile] Uploading:', file.name, '| size:', file.size);

            // SDK v24 uses named params object
            const response = await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file,
            });

            console.log('[uploadFile] Success. Stored file ID:', response.$id);
            return response;
        } catch (error) {
            console.error('[uploadFile] Failed:', error.message);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            // SDK v24 uses named params object
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId,
            });
            return true;
        } catch (error) {
            console.error('[deleteFile] Failed:', error.message);
            return false;
        }
    }

    getFilePreview(fileId) {
        if (!fileId) {
            console.warn('[getFilePreview] Called with empty fileId');
            return '';
        }

        // getFilePreview with transformation params (width, quality, etc.)
        // requires a paid Appwrite plan — free plan returns 403.
        // getFileView serves the raw file with no transformations — works on free plan.
        const url = this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId,
        });

        console.log('[getFilePreview] fileId:', fileId, '| url:', url);
        return url;
    }
}

const service = new Service();
export default service;
