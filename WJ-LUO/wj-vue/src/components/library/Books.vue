<!--图书界面（核心组件）-->
<!--20210816加入搜索框而注释-->
<!--<template>
  <div>
    <el-row style="height: 840px;">
      &lt;!&ndash;<search-bar></search-bar>&ndash;&gt;
      <el-tooltip effect="dark" placement="right"
                  v-for="item in books"
                  :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.author}}</span> /
          <span>{{item.date}}</span> /
          <span>{{item.press}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
        <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover">
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.title}}</a>
            </div>
          </div>
          <div class="author">{{item.author}}</div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row>
      <el-pagination
        :current-page="1"
        :page-size="10"
        :total="20">
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
    export default {
        name: 'Books',
        data () {
            return {
                books: [
                    {
                        cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
                        title: '三体',
                        author: '刘慈欣',
                        date: '2019-05-05',
                        press: '重庆出版社',
                        abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
                    }
                ]
            }
        }
    }
</script>
<style scoped>
  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }
  a {
    text-decoration: none;
  }
  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>-->

<template>
  <div>
    <el-row style="height: 840px;">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <el-tooltip effect="dark" placement="right"
                  v-for="item in books.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :key="item.bookId">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.author}}</span> /
          <span>{{item.pubDate}}</span> /
          <span>{{item.press}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
        <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover" @click="editBook(item)">
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.title}}</a>
            </div>
            <i class="el-icon-delete" @click="deleteBook(item.bookId)"></i>
          </div>
          <div class="author">{{item.author}}</div>
        </el-card>
      </el-tooltip>
      <!--确认按钮触发加载数据-->
      <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>
    </el-row>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="books.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
    import SearchBar from './SearchBar'
    import EditForm from './EditForm'

    export default {
        name: 'Books',
        components: {EditForm, SearchBar},
        data () {
            return {
                books: [],
                currentPage: 1,
                pagesize: 17
            }
        },
        mounted: function () {
            this.loadBooks()
        },
        methods: {
            // 加载图书
            loadBooks () {
                var _this = this
                const params = {keyName: ''}
                this.$axios.post('/libraryManagementMaitain/queryInfoBook', params).then(resp => {
                    if (resp && resp.status === 200) {
                    _this.books = resp.data.data
                    // const {data = [], columnNames = [], pageInfo = []} = resp
                    // _this.books = JSON.parse(JSON.stringify(this.books).replace(/value/g, 'label'))
                    // _this.books = JSON.parse(JSON.stringify(this.books).replace(/key/g, 'value'))
                    // _this.books = JSON.stringify(_this.books) // json对象转json字符串
                    // _this.books = JSON.parse(_this.books) // json字符串转json对象（原生方法）
                    // _this.tableData = data
                    // _this.dynamicClomuns = columnNames
                    // _this.pageInfo = pageInfo
                    // _this.tableLoading = false
                    }
                })
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage
                console.log(this.currentPage)
            },
            // 搜索键搜索图书
            searchResult () {
                var _this = this
                const params = {keyName: this.$refs.searchBar.keywords}
                this.$axios.post('/libraryManagementMaitain/queryInfoBook', params).then(resp => {
                    if (resp && resp.status === 200) {
                        _this.books = resp.data.data
                        console.log('搜索成功' + resp.data.data)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 修改图书
            editBook (item) {
                this.$refs.edit.dialogFormVisible = true
                this.$refs.edit.submitType = 'update'
                this.$refs.edit.form = {
                    bookId: item.bookId,
                    cover: item.cover,
                    title: item.title,
                    author: item.author,
                    pubDate: item.pubDate,
                    press: item.press,
                    abs: item.abs,
                    category: {
                        typeId: item.category.typeId.toString(),
                        typeName: item.category.typeName
                    }
                }
            },
            // 删除图书
            deleteBook (bookId) {
                this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        this.$axios.post('/libraryManagementMaitain/deleteBookInfo', {id: bookId}).then(resp => {
                            if (resp && resp.status === 200) {
                                this.loadBooks()
                                this.$message({type: 'info', message: '删除成功!'})
                            }
                        })
                    }
                ).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'})
                })
                // alert(id)
            }
        }
    }
</script>

<style scoped>

  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  .el-icon-delete {
    cursor: pointer;
    float: right;
  }

  .switch {
    display: flex;
    position: absolute;
    left: 780px;
    top: 25px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }


</style>


