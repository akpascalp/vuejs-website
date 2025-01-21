<template>
  <div class="px-4 sm:px-20">
    <div class="py-6 sm:py-[120px]">
      <GetInTouch />
    </div>
    <img src="/img_14.png" class="place-self-center pb-16 sm:pb-24" width="1200" />

    <div class="grid gap-y-8 lg:grid-cols-2 place-content-between">
      <div>
        <p class="text-[24px] pb-8">Sport Club</p>
        <p class="text-[16px] text-[#7C7C7C] underline">ADRESS
          <a href="https://goo.gl/maps/" class="text-blue-500" target="_blank" rel="noopener noreferrer">
            (View on map)
          </a>
        </p>
      </div>
      <div class="2xl:ml-28">
        <p class="text-[24px] pb-8">Opening Hours</p>
        <div class="grid grid-rows-4 grid-flow-col gap-x-12 text-[16px] text-[#7C7C7C]">
          <p v-for="day in days" class="grid grid-cols-5 gap-x-0">
            <p>{{ day }}</p>
            <p class="col-span-4">8:00 am - 8:30 p.m</p>
          </p>
          <p class="grid grid-cols-5 gap-x-0">
            <p>Sun</p>
            <p class="col-span-4">Closed</p>
          </p>
        </div>

        <p class="text-[24px] pt-12 pb-8">Phone Number</p>
        <p class="text-[16px] text-[#7C7C7C] underline">
          +XX XX XX XX XX XX
        </p>
      </div>
    </div>

    <hr class="mt-24" />

    <div class="sm:grid sm:grid-cols-2 pt-12 pb-8" ref="contact">
      <p class="text-[36px]">Contact Us</p>
      <p class="text-[16px] text-[#7C7C7C] justify-self-end place-self-center">All fields are required</p>
    </div>

    <form @submit="preventDefault">
      <div v-for="field in fields" class="grid grid-cols-1 gap-3 pb-8">
        <label class="text-[16px]">{{ field.title }}</label>
        <input :type="field.type" v-model="dataForm[field.key]"
          class="w-full border-0 border-b-2 pb-4 border-gray-200 p-0 focus:ring-gray-100 active:ring-gray-100"
          :placeholder="field.placeholder">
      </div>

      <div>
        <label class="text-[16px]">Your Message</label>
        <textarea class="w-full border-0 border-b-2 pb-4 border-gray-200 p-0 focus:ring-gray-100 active:ring-gray-100"
         v-model="messageText"/>
      </div>

      <div v-if="bookingDate" class="grid grid-cols-1 gap-3 pb-8">
        <label class="text-[16px]">Booking date</label>
        <input type="datetime-local" :value="bookingDateValue"
          class="w-full border-0 border-b-2 pb-4 border-gray-200 p-0 focus:ring-gray-100 active:ring-gray-100">
      </div>

      <div class="my-8 grid gap-y-8 sm:grid-cols-2">
        <div class="flex items-center">
          <label class="pr-8">I'm interested in</label>
          <ListBox class="w-72" :dataList="dataList" :addAllOption="false" :initValue="initValue"
            @update="interestedIn = $event" />
        </div>
        <button class="btn-secondary justify-self-start sm:justify-self-end w-56" @click="sendMessage" :disabled=disabled>
          Send
        </button>
      </div>
    </form>

    <div v-show="showConfirmation"
      class="bg-[#efcb90] border-t-4 border-[#b38232] rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
      <div class="flex">
        <div class="py-1"><svg class="fill-current h-6 w-6 text-[#b38232] mr-4" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg></div>
        <div>
          <p class="font-bold">Thank you !</p>
          <p class="text-sm">Your message has been sent, we will shortly come back to you.</p>
        </div>
      </div>
    </div>

    <div v-show="showError" class="bg-red-300 text-black border-t-4 border-red-500 rounded-b px-4 py-3 shadow-md"
      role="alert">
      <div class="flex">
        <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg></div>
        <div>
          <p class="font-bold">Error</p>
          <p class="text-sm">Message not sent, please call +XX XX XX XX XX XX</p>
          <p v-for="value, key in errorMessage">{{ key }}: {{ value.join(" - ") }}</p>
        </div>
      </div>
    </div>

  </div>
</template>
        
<script>
import GetInTouch from '@/components/animatedTitles/GetInTouch.vue';
import ListBox from '@/components/ListBox.vue';
import { mapGetters } from 'vuex';
import Axios from '@/service/index.js';
import axios from 'axios';

export default {
  components: {
    ListBox,
    GetInTouch
  },
  props: {
    bookingDate: {
      type: String,
      required: false,
      default: undefined
    }
  },
  data() {
    return {
      fields: [
        { title: 'Your Name', placeholder: 'e.g, XXX', key: 'name', type: 'text' },
        { title: 'Your Surname', placeholder: 'e.g, XXX', key: 'surname', type: 'text'},
        { title: 'Your Date of Birth', placeholder: 'dd/mm/yyyy', key: 'dateOfBirth', type: 'date' },
        { title: 'Your Email', placeholder: 'mail@***.com', key: 'email', type: 'email' },
        { title: 'Your Phone Number', placeholder: '+xx xxxx xxx xxxx', key: 'phoneNumber', type: 'text' },
      ],
      dataForm: {
        'name': '', 'surname': '', 'dateOfBirth': '', 'email': '', 'phoneNumber': '',
      },
      bookingDateValue: '',
      dataList: [{value: null, text: '-'}],
      initValue: undefined,
      showConfirmation: false,
      showError: false,
      interestedIn: null,
      messageText: '',
      errorMessage: '',
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    }
  },
  beforeMount() {
    Axios
      .get('/club/sessions/filters')
      .then(res => {
        res.data.disciplines.forEach(x => this.dataList.push({ value: x.id, text: x.name }))
        this.dataList.push({ value: 'other', text: 'Other' })
        this.initValue = this.dataList[0];
      })
  },
  mounted() {
    setTimeout(() => {
      this.$scrollTo(this.$refs.contact, 2500, { offset: -20 });
    }, 1000);
  },
  created() {
    if (this.bookingDate === 'today') {
      const currentDate = new Date();
      this.bookingDateValue = currentDate.getFullYear() + '-' + String(currentDate.getMonth() + 1).padStart(2, '0') + '-' + String(currentDate.getDate() + 1).padStart(2, '0') + 'T00:00'
    } else {
      this.bookingDateValue = this.bookingDate;
    }
  },
  computed: {
    disabled() {
      return !Object.keys(this.dataForm).every((k) => this.dataForm[k] !== '') || this.interestedIn === null
    },
    ...mapGetters(['contentData']),
  },
  methods: {
    sendMessage() {
      let interestedIn = undefined;
      this.dataList.forEach(x => {
        if (this.interestedIn === x.value) {
          interestedIn = x.text;
        }
      })
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const todayDate = `${year}-${month}-${day}`;

      let data = { ...this.dataForm, interestedIn, bookingDate: this.bookingDateValue, message: this.messageText }

      let dataClubManager = {
        firstname: this.dataForm.name,
        lastname: this.dataForm.surname,
        birth_date: this.dataForm.dateOfBirth.split('/').reverse().join('-'),
        club_name: "Sport Club",
        phone: this.dataForm.phoneNumber,
        email: this.dataForm.email,
        message: this.messageText,
        send_date: todayDate,
        booking_date: this.bookingDateValue,
        interested_in: interestedIn,
        is_archived: false
      }
      axios.post(`${import.meta.env.VITE_API_PATH}/prospects`, dataClubManager);
      Axios
        .post('/club/forms/contact', data)
        .then(res => {
          this.showConfirmation = true;
          this.showError = false;
        })
        .catch(err => {
          this.errorMessage = err.response.data.validation
          this.showConfirmation = false;
          this.showError = true;
        })
    },
    preventDefault(e) {
      e.preventDefault()
    },
  }
}
</script>
