import API  from '@/api/infos';
import StoreActions from './../StoreActions'

const info = {};
new StoreActions(API,info).init();


export default info;
