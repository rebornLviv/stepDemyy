<template>
<v-col cols="8" class="userData">
    <div>
        <h2 class="primary-text">Add your Lesson</h2>
    </div>
    <div>
        <form>
            <v-text-field 
                name="title" 
                label="Title course" 
                id="title" 
                v-model="title" 
                required 
                >
            </v-text-field>
            <v-select
                :items="items"
                label="Outlined style"
                outlined
                v-model="course"
            ></v-select>
            <v-textarea outlined name="Description" label="Description" id="description" v-model="description">
            </v-textarea>
            <v-file-input
                    v-model="files"
                    color="deep-purple accent-4"
                    counter
                    label="File input"
                    multiple
                    placeholder="Select your files"
                    prepend-icon="mdi-paperclip"
                    outlined
                    :show-size="1000"
                >
                    <template v-slot:selection="{ index, text }">
                    <v-chip
                        v-if="index < 2"
                        color="deep-purple accent-4"
                        dark
                        label
                        small
                    >
                        {{ text }}
                    </v-chip>

                    <span
                        v-else-if="index === 2"
                        class="overline grey--text text--darken-3 mx-2"
                    >
                        +{{ files.length - 2 }} File(s)
                    </span>
                    </template>
                </v-file-input>
            <v-btn 
                class="primary"
                :disabled="!formIsValid"
            >
                Add Video
            </v-btn>
        </form>
    </div>

</v-col>
</template>

<script>
export default {
    data: () => ({
        files: [],
        title: '',
        course: '',
        description: '',
        items: ['Angular', 'TypeScript']
    }),
    computed: {
        formIsValid() {
            return this.title !== '' && this.course !== '' && this.items !== '' && this.files !== ''
        }
    }
}
</script>
