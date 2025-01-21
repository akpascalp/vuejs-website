<template>
  <Listbox v-model="modelValue" :multiple="addAllOption" :onChange="$emit('update', modelValue)"
    :disabled="dataList.length <= 1">
    <div class="relative mt-1" :class="dataList.length <= 1 ? 'opacity-50' : 'opacity-100'">
      <ListboxButton class="p-4 pr-16 border-[rgb(210,210,210)] border w-full">
        <span>{{ displayedText }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions
          class="z-40 absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5">
          <ListboxOption v-slot="{ active, selected }" v-for="data in dataList" :key="data" :value="data.value"
            as="template">
            <li :class="[
              active ? 'bg-slate-100 text-slate-900' : 'text-gray-900',
              'relative cursor-default select-none py-2 pl-4 pr-4',
            ]">
              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate',]">{{ data.text }}</span>
              <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-600">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon
  },
  data() {
    return {
      modelValue: this.initValue.value,
      dataListAll: [],
      unwatch: undefined
    }
  },
  computed: {
    displayedText() {
      let displayedText = "";
      if (this.addAllOption) {
        let textList = [];
        this.modelValue.forEach(x => {
          this.dataList.forEach(val => {
            if (val.value === x) {
              textList.push(val?.text)
            }
          })
        })
        displayedText = textList.join(", ")
      } else {
        this.dataList.forEach(val => {
          if (val?.value === this.modelValue) {
            displayedText = val?.text
          }
        })
      }
      return displayedText
    }
  },
  created() {
    if (this.addAllOption) {
      this.dataList.unshift({ text: "All", value: null })
      this.modelValue = [this.dataList[0].value];
    } else if (this.modelValue === undefined) {
      this.modelValue = this.dataList[0]?.value
    }

    if (this.initValue) {
      this.unwatch = this.$watch('initValue', this.updateInitValue)
    }
  },
  props: {
    dataList: {
      type: Array,
      required: true
    },
    initValue: {
      type: Object,
      required: false,
      default: [{ text: "All", value: null }]
    },
    addAllOption: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  watch: {
    modelValue(newValue, oldValue) {
      if (this.addAllOption) {
        if (oldValue && oldValue.includes(null) && oldValue.length === 1 && newValue.length > 1) {
          this.modelValue = this.modelValue.filter(e => e !== null)
        } else if ((newValue.includes(null) && newValue.length > 1) || newValue.length === 0) {
          this.modelValue = [null]
        }
      }
    },
    dataList() {
      if (this.addAllOption) {
        this.dataList.unshift({ text: "All", value: null })
        this.modelValue = [this.dataList[0].value]
      } else {
        this.modelValue = this.dataList[0].value
      }
    }
  },
  methods: {
    updateInitValue(value) {
      this.modelValue = value.value;
      this.$emit('update', this.modelValue)
      if (value !== undefined) {
        this.unwatch()
      }
    }
  }
}
</script>