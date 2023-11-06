

class Pagination{

    init(itemsPerPage, totalItems, currentPage) {
        this.currentPage = currentPage;
        this.itemsPerPage = itemsPerPage;
        this.totalItems = totalItems;
        this.firstPage = 1;
        this.lastPage = Math.ceil(totalItems/itemsPerPage);
        this.hasPrevious = (this.currentPage > 1) ;
        this.hasNext = ((this.itemsPerPage*this.currentPage) < this.totalItems);
        this.previousPage = this.currentPage - 1;
        this.nextPage = this.currentPage + 1; 
    }

    getResultSet(Model, itemPerPage, currentPage){
        const customPromise = new Promise((resolve, reject) => {
            Model.find()
            .countDocuments()
            .then(amount => {
                this.init(itemPerPage, amount, currentPage);
                return  Model.find()
                        .skip((currentPage-1)*itemPerPage)
                        .limit(itemPerPage);
            })
            .then( result =>resolve(result) )
            .catch( err=> reject(err) );
            })
        return customPromise ;
    }

}

export default Pagination ;