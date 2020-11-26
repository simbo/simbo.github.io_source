import Vue from 'vue';

export const messageBus = (window['messageBus'] = new Vue());
