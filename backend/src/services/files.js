import AWS from 'aws-sdk'
import path from 'path'
import { v4 } from 'uuid'
import { config } from '../config'
const { awsBucketName } = config

class Files {

    constructor() {
        this.s3 = new AWS.S3()
    }

    async download(fileName) {
        try {
            const result = this.s3.getObject({
                Key: fileName,
                Bucket: awsBucketName
            }).createReadStream()

            return {
                success: true,
                message: 'File downloaded successfully',
                data: result
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                message: "An error ocurred"
            }
        }
    }

    async upload(fileName, file) {
        try {
            const ext = path.extname(fileName)
            const Key = v4() + ext

            const result = await this.s3.upload({
                Bucket: awsBucketName,
                Key,
                Body: file
            }).promise()
            return {
                success: true,
                message: 'File uploaded successfully',
                key: result.Key,
                location: result.Location
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "An error ocurred"
            }
        }
    }

    async delete(fileName) {
        try {
            await this.s3.deleteObject({
                Bucket: awsBucketName,
                Key: fileName,
            }).promise()
            return {
                success: true,
                message: 'File deleted successfully',
                file: fileName,
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default Files