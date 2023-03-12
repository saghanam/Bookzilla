import knex from 'knex';
import config from '../../config/config.js'
const db = knex(config)

class bookController{
    async fetchAllBooks(){
        try{
            var dataArr = [];
            return db.select().from('books').leftJoin('catalog','books.id','catalog.book_id').leftJoin('bookstore','bookstore.id','catalog.store_id').then((result)=>{
                result.forEach((val)=>{
                    
                    dataArr.push(val);
                })
                return Promise.resolve(dataArr);
            })
        }
        catch(err){
            return Promise.reject(err);
        }
    }

    async fetchBooksFromBookstore(store_id){
        try{
            var dataArr = [];
            return db.select().from('books').leftJoin('catalog','books.id','catalog.book_id').leftJoin('bookstore','bookstore.id','catalog.store_id').where({'catalog.store_id': store_id}).then((result)=>{
                result.forEach((val)=>{
                    dataArr.push(val);
                })
                return Promise.resolve(dataArr);
            })
        }
        catch(err){
            return Promise.reject(err)
        }
    }

    async createBookstore(store){
        try{
            let data = await db('bookstore').returning(['id','store_name','location']).insert(store);
            return Promise.resolve(data)
        }catch(err){
            return Promise.reject(err)
        }
    }

    async addBooks(data){
        try{
            let store_id = data.store_id
            let books = data.data
            books.map(async(val)=>{
                let book_name = val.book_name;
                let status = await this.checkStock(val.quantity);
                const [{id}]= await db('books').returning('id').insert({book_name})
                await db('catalog').insert({book_id:id,store_id,quantity:val.quantity,status})
            })
            return Promise.resolve(books)

        }catch(err){
            return Promise.reject(err);
        }
    }

    async checkStock(quantity){
        try{
            if(quantity < 0) throw new Error('Quantity cannot be less than 0')
            let status = quantity >0 ? 'in_stock':'out_of_stock'
            return Promise.resolve(status)
        }catch(err){
            return Promise.reject(err)
        }
    }

    async editBook(book){
        try{
            let status = await this.checkStock(book.quantity)
            const data = await db('catalog').returning(['book_id','quantity','status']).where({book_id: book.book_id,store_id:book.store_id}).update({status,quantity:book.quantity})
            return Promise.resolve(data)
        }catch(err){
            return Promise.reject(err)
        }
    }

    async editBooks(books){
        try{
            const {store_id} = books;
            books.data.map(async(val)=>{
                let status = await this.checkStock(val.quantity);
                await db('catalog').returning(['book_id','quantity','status']).where({book_id: val.book_id,store_id}).update({status,quantity:val.quantity})
            })
            return Promise.resolve({code:200,data:"Updated"})

        }catch(err){
            return Promise.reject(err)
        }
    }

    async deleteBook(id){
        try{
            await db('books').where({id}).del()
            await db('catalog').where({book_id:id}).del()
            return Promise.resolve({data:"Deleted"})
        }catch(err){
            return Promise.reject(err);
        }
    }

    async deleteBooks(books){
        try{
            books.data.map(async(val)=>{
                await db('books').where({id:val.book_id}).del()
                await db('catalog').where({book_id:val.book_id}).del()
            })
            return Promise.resolve({data:"Deleted"})
        }catch(err){
            return Promise.reject(err);
        }
    }

    async updateStatus(){
        try{
            var dataArr = [];
            return db.select().from('catalog').where({quantity: 0}).then((result)=>{
                result.forEach(async(val)=>{
                    dataArr.push(val)
                    await db('catalog').returning(['book_id','quantity','status']).where({quantity:0}).update({status:'out_of_stock'})
                    return Promise.resolve(dataArr);
                })
            })
        }catch(err){
            return Promise.reject(err);
        }
    }
    
}

export default new bookController();