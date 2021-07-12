<template>
  <div class="container">

    <div v-if="credentials">
      <el-row justify="end">
          <el-button type="info" @click.prevent="logout">{{ $t('logout') }}</el-button>
          <el-button type="primary" @click.prevent="refresh">{{ $t('refresh') }}</el-button>
      </el-row>

      <el-row class="description center">
        <el-col :xs="24" :md="8">
          <el-row>
            <el-col :span="8" class="label center">
              <i class="el-icon-user"></i>
              <span>{{ $t('name') }}</span>
            </el-col>
            <el-col :span="16">
              <span>{{ credentials.studentName }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :md="8">
          <el-row>
            <el-col :span="8" class="label center">
              <span>{{ $t('studentID') }}</span>
            </el-col>
            <el-col :span="16">
              <span>{{ credentials.studentID }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :md="8">
          <el-row>
            <el-col :span="8" class="label center">
              <span>{{ $t('class') }}</span>
            </el-col>
            <el-col :span="16">
              <span>{{ credentials.class }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <div v-if="credentials.selection != 0">
        <h2>{{ $t('appointment') }}:</h2>
        
        <h2>{{ dayTime[credentials.selection-1].day }} {{ dayTime[credentials.selection-1].time }}</h2>
      </div>

      <div v-else-if="moment().isBefore(moment(status.openTime))">
        <h2>尚未開放</h2>
        <h3>開放時間: {{ moment(status.openTime).format('M/D H:mm:ss') }}</h3>
      </div>

      <div v-else-if="status.result" :class="{ disabled: credentials.selection != 0 }" style="margin-top: 20px;">
        <div v-if="status.result.length">
          <el-row justify="center" class="table">
            <el-col :span="10" class="label center">
              {{ $t('time') }}
            </el-col>
            <el-col :span="14" class="label center">
              {{ $t('status' )}}
            </el-col>
          </el-row>
          <el-row v-for="d in status.result" :key="`${d.day}${d.time}`" justify="center" class="table center">
            <el-col :span="10">
              {{ d.day }}<br/>{{ d.time }}
            </el-col>
            <el-col :span="14">
              <el-button type="primary" plain @click.prevent="book(d.selection)">{{ $t('book') }}</el-button>
            </el-col>
          </el-row>
        </div>

        <div v-else>
          <el-row>
            <el-col :span="24">
              <el-result icon="info" title="無可預約時段">
              </el-result>
            </el-col>
          </el-row>
        </div>
      
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Appointment',
  data: function() {
    return {
      status: {},
      dayTime: [{
        day: '7/13 （二）',
        time: '16:00 - 17:00'
      }, {
        day: '7/14 （三）',
        time: '16:00 - 17:00'
      }, {
        day: '7/15 （四）',
        time: '16:00 - 17:00'
      }, {
        day: '7/17 （六）',
        time: '09:00 - 10:30'
      }, {
        day: '7/17 （六）',
        time: '10:30 - 13:00'
      }, {
        day: '7/17 （六）',
        time: '13:00 - 14:30'
      }, {
        day: '7/17 （六）',
        time: '14:30 - 16:00'
      }] 
    }
  },
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
  created() {
    console.log(this.credentials)
    this.moment = moment
    this.getStatus()    
  },
  methods: {
    logout: function() {
      localStorage.removeItem('cred')
      this.$emit('update:login', false)
      this.$emit('update:credentials', { dorm: 0, room: 0, bed: 0, class: '', studentID: '', name: '', selection: '', token: '' })
    },
    refresh: function() {
      // do api calls
      console.log(this.status)
      this.getStatus()
    },
    getStatus: async function() {
      if (this.credentials.token) {
        try {
          const res = await this.axios.request({
            url: '/status',
            method: 'get',
            headers: {
              authorization: this.credentials.token
            }
          })
          console.log(res)
  
          if (res.status == 201) {
            this.$emit('update:credentials', { ...this.credentials, selection: res.data.selection })
            this.status = {}
          } else if (res.status == 200) {
            this.status = res.data
          }
        } catch (err) {
          console.error(err)
        }
      } else {
        this.$message.error('請先登入')
        this.$emit('update:login', false)
      }
    },
    book: async function(selection) {
      try {
        console.log(selection)
        const res = await this.axios.request({
          url: '/book',
          method: 'post',
          headers: {
            authorization: this.credentials.token
          },
          data: {
            selection
          }
        })
        console.log(res)

        if (res.status == 201) {
          this.$emit('update:credentials', { ...this.credentials, selection: res.data.selection })
          this.status = {}
        } else if (res.status == 204) {
          this.$message.success('已預約成功')
          this.getStatus()
        }
      } catch (err) {
        console.error(err)
        this.$message.error('無法預約此時段...')
        this.getStatus()
      }
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
  padding: 10px;
}
.table.el-row {
  border-bottom: 1px solid #E0E0F0;
  border-collapse: collapse;
}

.disabled {
  cursor: not-allowed;
}
</style>
