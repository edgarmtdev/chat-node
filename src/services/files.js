import AWS from 'aws-sdk'
import { config } from '../config'
const { awsBucketName } = config

class Files {
    constructor() {
        this.s3 = new AWS.S3()
    }
    async download() { }

    async upload(fileName, file) {
        try {
            const result = await this.s3.upload({
                Bucket: awsBucketName,
                Key: fileName,
                Body: file
            }).promise()
            return {
                success: true,
                message: 'File uploaded successfully',
                key: result.Key,
                location: result.Location
            }
        } catch (err) {
            console.log(error)
            return { 
                success: false, 
                message: "An error ocurred" 
            }
        }
    }

    async delete() { }
}

export default Files