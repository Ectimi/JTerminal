import {CommandType} from '../../command'

const addBookmarkCommand:CommandType ={
    func:'add',
    name:'添加书签',
    desc:'添加书签',
    alias:[],
    params:[
        {
            key:'url',
            desc:'书签链接',
            required:true
        },
        {
            key:'name',
            desc:'书签名称',
            required:true,
        }
    ],
    options:[],
    actions(options,terminal){
        console.log('add bookmark')
    }
}