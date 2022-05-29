const {Validator} = require('node-input-validator');

const Post = {
    title: "required|string",
    photo: "required|string",
    content: "required|string"
};

const PostPartial = {
    title: "string",
    photo: "string",
    content: "string"
};

const validate = async (data, schema) => {
    let v = new Validator (data, schema);
    let e = await v.check();
    if(!e) {
        throw{
            code: 400,
            error: v.errors
        };
    }
};

module.exports = {
    Post,
    PostPartial,
    validate
}