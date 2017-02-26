const retMsg = require('../util/return.msg');
const enable = require('../util/enable.status');
const adminLog = require('../util/log/admin.write.log');

const FaqInfo = require('../../../models').FaqInfo;

const faqEditOption = {
    NOACTION: 'noaction',
    MODIFIED: 'modified',
    ADDED: 'added',
    DELETED: 'deleted'
};

/**
 * FAQ 추가
 *
 * @param req
 * @param res
 */
exports.create = (req, res) => {
    const {
        faqTitle,
        faqContents
    } = req.body;

    if (!faqTitle) {
        return retMsg.error400InvalidCall(res, 'ERROR_MISSING_PARAM', 'faqTitle');
    }
    else if (!faqContents) {
        return retMsg.error400InvalidCall(res, 'ERROR_MISSING_PARAM', 'faqContents');
    }


    FaqInfo.create({
        faqTitle,
        faqContents,
        editType: faqEditOption.ADDED,
        orderNo,
        faqEnable: enable.enableCode.ENABLE_USE
    })
        .then(result => {
            adminLog('faqInfo', faqEditOption.ADDED, {
                faqId: result.id,
                faqTitle: result.faqTitle,
                faqContents: result.faqContents,
                editType: result.editType,
                orderNo: result.orderNo,
                faqEnable: result.faqEnable,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            });

            return retMsg.success201(res);
        })
        .catch(err => retMsg.error500Server(res, err));
};

/**
 *  FAQ 수정
 *
 * @param req
 * @param res
 */
exports.update = (req, res) => {
    const faqId = req.params.faqId;

    const {
        faqTitle,
        faqContents
    } = req.body;

    if (!faqTitle && !faqContents) {
        return retMsg.error400InvalidCall(res, 'ERROR_MISSING_PARAM', 'updateTarget');
    }

    FaqInfo.findOne({
        where: {
            id: faqId,
            faqEditType: {
                // 삭제처리된 FAQ는 검색 X
                $ne: faqEditOption.DELETED
            },
            faqEnable: {
                $gte: enable.enableCode.ENABLE_ADMIN
            }
        }
    }).then(faq => {
        if (!faq) {
            return retMsg.error404NotFound(res);
        }

        let isModified = false;
        const logData = {};

        const beforeTitle = faq.faqTitle;
        const beforeContents = faq.faqContents;

        if (faqTitle && faqTitle !== beforeTitle) {
            logData.faqTitle = {
                before: beforeTitle,
                after: faqTitle
            };

            faq.faqTitle = faqTitle;
            isModified = true;
        }

        if (faqContents && faqContents !== beforeContents) {
            logData.faqContents = {
                before: beforeContents,
                after: faqContents
            };

            faq.faqContents = faqContents;
            isModified = true;
        }

        // 수정된 내용이 있을 때만 실행
        if (isModified) {
            // 추가된 FAQ는 값을 수정해도 TYPE이 ADDED
            if (faq.editType !== faqEditOption.ADDED) {
                logData.editType = {
                    before: faq.editType,
                    after: faqEditOption.MODIFIED
                }
            }

            // 수정된 내용 로그에 저장
            logData.faqId = faq.id;
            adminLog('faqInfo', faqEditOption.MODIFIED, logData);

            faq.save()
                .then(result => retMsg.success200(res))
                .catch(err => retMsg.error500Server(res, err));
        }
        else {
            return retMsg.error400InvalidCall(res, 'ERROR_NO_MODIFIED_PARAM');
        }
    })
};

/**
 * FAQ 활성 상태 변경 - faqEditType
 *
 * @param req
 * @param res
 */
exports.deleteEditType = (req, res) => FaqInfo.findOne({
    where: {
        id: req.params.id,
        faqEnable: {
            $gte: enable.enableCode.ENABLE_ADMIN
        }
    }
}).then(faq => {
    if (!faq) {
        return retMsg.error404NotFound(res);
    }
    else if (faq.editType === faqEditOption.DELETED) {
        return retMsg.error400InvalidCall(res, 'ERROR_NO_MODIFIED_PARAM');
    }

    const logData = {};
    if (faq.editType === faqEditOption.ADDED) {
        logData.faqEnable = {
            before: faq.faqEnable,
            after: enable.enableCode.ENABLE_DELETE
        };

        faq.editType = faqEditOption.NOACTION;
        faq.faqEnable = enable.enableCode.ENABLE_DELETE;
    }
    else {
        faq.editType = faqEditOption.DELETED;
    }

    faq.save()
        .then(result => {
            // 수정된 내용 로그에 저장
            logData.faqId = faq.id;
            adminLog('faqInfo', faqEditOption.DELETED, logData);

            retMsg.success200(res)
        })
        .catch(err => retMsg.error500Server(res, err));
});

/**
 * faq 배포
 *
 * @param req
 * @param res
 */
exports.deploy = (req, res) => FaqInfo.findAll({
    where: {
        faqEditOption: {
            $ne: faqEditOption.NOACTION
        }
    }
}).then(faqs => {
    if(faqs.length === 0){
        return retMsg.error404NotFound(res);
    }

    
});