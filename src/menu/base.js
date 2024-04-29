import React,{Component} from "react";
 export const MyRootContext = React.createContext('superRoot')


 export default class Base extends Component{
    static contextType = MyRootContext;
    constructor(props) {
        super(props);
    }
}