"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DownloadController {
    constructor(props) {
        this.service = props.service;
        this.logger = props.service.logger;
        // this.logger.debug({ msg: 'Test Api ApiController', data: props })
    }
    async downloadFile(req, res, next) {
        try {
            if (req.body.filePath) {
                // res.download(`.${req.body.filePath}`)
                console.log(process.cwd());
                const path = __dirname;
                res.sendFile(path, function (err) {
                    if (err) {
                        console.log(err);
                        return res
                            .status(500)
                            .json({ success: false, message: 'internal server error. please try again later' });
                    }
                    else {
                        console.log('Sent:', path, 'at', new Date().toString());
                    }
                });
            }
            else {
                next({ error: 'No file Path' });
            }
        }
        catch (myE) {
            next(myE);
        }
        // try {
        //       const filePath = req.body.filePath // Use req.query for query parameters
        //
        //       // Use the file path to send the file for download
        //       res.download(`.${filePath}`, (err) => {
        //             if (err) {
        //                   console.error('File download failed', err)
        //                   //res.status(400).json({ download: false, message: 'File downloaded Error', error: err })
        //             } else {
        //                   console.log('File downloaded successfully')
        //                   res.json({ download: true, message: 'File downloaded Error' })
        //             }
        //       })
        // } catch (myE: any) {
        //       next(myE)
        // }
    }
}
exports.default = DownloadController;
