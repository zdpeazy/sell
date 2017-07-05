// eventBus中我们只创建了一个新的Vue实例，
// 以后它就承担起了组件之间通信的桥梁了，也就是中央事件总线
// new Vue实例化一个组件的时候要加上()
import Vue from 'vue';
export default new Vue();
