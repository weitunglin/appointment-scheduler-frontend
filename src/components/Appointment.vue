<template>
  <div class="container">

    <div v-if="credentials">
      <el-row justify="end">
          <el-button type="info" @click.prevent="logout">Log Out</el-button>
          <el-button type="primary" @click.prevent="refresh">Refresh</el-button>
      </el-row>

      <el-row class="description center">
        <el-col :xs="24" :md="8">
          <el-row>
            <el-col :span="8" class="label center">
              <i class="el-icon-user"></i>
              <span>Name</span>
            </el-col>
            <el-col :span="16">
              <span>{{ credentials.studentName }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :md="8">
          <el-row>
            <el-col :span="8" class="label center">
              <span>Student ID</span>
            </el-col>
            <el-col :span="16">
              <span>{{ credentials.studentID }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :md="8">
          <el-row>
            <el-col :span="8" class="label center">
              <span>Class</span>
            </el-col>
            <el-col :span="16">
              <span>{{ credentials.class }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <div style="margin-top: 20px;">
        <el-row justify="center" class="table">
          <el-col :span="10" class="label center">
            Time
          </el-col>
          <el-col :span="14" class="label center">
            Status
          </el-col>
        </el-row>
        <el-row justify="center" class="table">
          <el-col :span="10">
            7/13 Tue. <br/>16:00 - 17:00
          </el-col>
          <el-col :span="14">
            
          </el-col>
        </el-row>
        <el-row justify="center" class="table">
          <el-col :span="10">
            7/14 Wed. <br/>16:00 - 17:00
          </el-col>
          <el-col :span="14">
            
          </el-col>
        </el-row>
        <el-row justify="center" class="table">
          <el-col :span="10">
            7/15 Thu. <br/>16:00 - 17:00
          </el-col>
          <el-col :span="14">
            
          </el-col>
        </el-row>
        <el-row justify="center" class="table">
          <el-col :span="10">
            7/17 Sat. <br/>09:00 - 10:30
          </el-col>
          <el-col :span="14">
            
          </el-col>
        </el-row>
        <el-row justify="center" class="table">
          <el-col :span="10">
            7/13 Tue. <br/>10:30 - 13:00
          </el-col>
          <el-col :span="14">
            
          </el-col>
        </el-row>
        <el-row justify="center" class="table">
          <el-col :span="10">
            7/13 Tue. <br/>13:00 - 14:30
          </el-col>
          <el-col :span="14">
            
          </el-col>
        </el-row>
        <el-row justify="center" class="table">
          <el-col :span="10">
            7/13 Tue. <br/>14:30 - 16:00
          </el-col>
          <el-col :span="14">
            
          </el-col>
        </el-row>
        
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Appointment',
  props: {
    credentials: {
      dorm: Number,
      room: Number,
      bed: Number,
      class: String,
      studentID: String,
      studentName: String,
      selection: String | undefined,
      token: String
    },
    login: Boolean
  },
  emits: ['update:login', 'update:credentials'],
  async created() {
    console.log(this.credentials)
    
    if (this.credentials.token) {
      const res = await this.axios.request({
        url: '/status',
        method: 'get',
        headers: {
          authorization: this.credentials.token
        }
      })
      console.log(res)
    }
  },
  methods: {
    logout: function() {
      localStorage.removeItem('cred')
      this.$emit('update:login', false)
      this.$emit('update:credentials', { dorm: 0, room: 0, bed: 0, class: '', studentID: '', name: '', selection: '', token: '' })
    },
    refresh: function() {
      // do api calls
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container {
  width: 80%;
  margin: 10px auto 10px auto;
}
.label {
  font-weight: 700;
  color: #909399;
  background: #fafafa;
  height: 60px;
  display: flex;
}
.description {
  padding: 10px;
}

.description .el-row .el-col {
  padding: 10px;
}

.description .el-row {
  border: 1px solid #EBEEF5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center {
  justify-content: center;
  align-items: center;
}

.unavailable {
  height: 30px;
  width: 50px;
}
.unavailable::after {
  border: 1px solid #EBEEF0;
  content: 'Unavailble';
}
.table .el-col {
  padding: 5px;
}
.table.el-row {
  border-bottom: 1px solid #E0E0F0;
  border-collapse: collapse;
}
</style>
