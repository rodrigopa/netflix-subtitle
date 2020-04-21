<template>
    <div id="app">
        <h2>Netflix subtitle <toggle-button v-model="options.active" :labels="{checked: 'ON', unchecked: 'OFF'}" class="toggle"></toggle-button></h2>
        <div id="options" v-show="options.active">
            <div class="field-group">
                <label>Tamanho da fonte: <strong>{{options.subtitle.font.size}}px</strong></label>
                <vue-slider v-model="options.subtitle.font.size"></vue-slider>
            </div>
            <div class="field-group">
                <label>Cor da fonte</label>
                <input type="color" class="colorbutton" v-model="options.subtitle.font.color">
            </div>
            <div class="field-group">
                <label>Fundo</label>
                <toggle-button v-model="options.subtitle.background.active" :labels="{checked: 'ON', unchecked: 'OFF'}" class="toggle"></toggle-button>
            </div>
            <div class="field-group" v-show="options.subtitle.background.active">
                <label>Cor do fundo</label>
                <input type="color" class="colorbutton" v-model="options.subtitle.background.color">
            </div>
        </div>
    </div>
</template>

<script>
    import VueSlider from 'vue-slider-component'
    import { ToggleButton } from 'vue-js-toggle-button'
    import 'vue-slider-component/theme/default.css'

    export default {
        components: {
            VueSlider,
            ToggleButton
        },
        name: 'app',
        data() {
            return {
                options: {},
                defaultOptions: {
                    active: false,
                    subtitle: {
                        background: {
                            active: false,
                            color: '#ffffff'
                        },
                        font: {
                            size: 48,
                            color: '#ffffff'
                        }
                    }
                }
            }
        },
        watch: {
            options: {
                handler(val) {
                    localStorage.setItem('netflix-subtitle-options', JSON.stringify(this.options))
                    this.updateSubtitle();
                },
                deep: true
            }
        },
        methods: {
            updateSubtitle() {
                const self = this;
                chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'update-subtitle', subtitleOptions: self.options });
                });
            }
        },
        created() {
            let storedOptions = localStorage.getItem('netflix-subtitle-options')
            if (storedOptions == null)
                storedOptions = {}
            else
                storedOptions = JSON.parse(storedOptions)

            this.options = Object.assign(this.defaultOptions, storedOptions)
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Lato');
    #app {
        width: 300px;
        font-family: 'Lato', sans-serif;
        font-size: 15px;
    }
    #options {
        margin-top: 15px;
        border-top: 1px solid #f3f3f3;
        padding: 15px 0;
    }
    #options label {
        margin-bottom: 8px;
        text-transform: uppercase;
        color: #343434;
    }
    #options .colorbutton::-webkit-color-swatch-wrapper {
        padding: 0;
    }
    #options .colorbutton::-webkit-color-swatch {
        border: none;
    }
    #options .field-group {
        margin-bottom: 12px;
    }
    #options .colorbutton {
        -webkit-appearance: none;
        padding: 0;
        margin-left: 20px;
        border-radius: 15px;
        vertical-align: middle;
        overflow: hidden;
        border: 2px solid #000;
    }
    .toggle {
        margin-left: 15px;
    }
</style>