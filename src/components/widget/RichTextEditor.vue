<script setup lang="ts">
import {EditorContent, useEditor} from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import {Placeholder} from '@tiptap/extensions';
import {onBeforeUnmount, watch} from 'vue';
import IconBulletList from "@/components/icons/IconBulletList.vue";
import IconNumberedList from "@/components/icons/IconNumberedList.vue";
import IconBold from "@/components/icons/font-related/IconBold.vue";
import IconItalic from "@/components/icons/font-related/IconItalic.vue";
import IconUnderline from "@/components/icons/font-related/IconUnderline.vue";

const props = withDefaults(defineProps<{
  modelValue: string | null | undefined,
  placeholder?: string,
  editable?: boolean
}>(), {
  placeholder: 'Type or paste the job description, or your notes here!',
  editable: false
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.modelValue,
  editable: props.editable !== false,

  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: props.placeholder,
      emptyEditorClass: 'is-editor-empty',
    }),
  ],

  editorProps: {
    attributes: {
      class: 'prose prose-sm dark:prose-invert max-w-none w-full min-h-[150px] p-3 focus:outline-none leading-normal ' +
          'prose-p:my-1 prose-li:my-0 prose-ul:my-2 prose-ol:my-2'
    }
  },

  onUpdate: ({editor}) => {
    const md = editor.getHTML();
    emit('update:modelValue', md || null);
  }
});

watch(() => props.modelValue, (newVal) => {
  if (!editor.value) {
    return;
  }

  const currentMarkdown = editor.value.getHTML();

  if (newVal !== currentMarkdown) {
    editor.value.commands.setContent(newVal, {
      emitUpdate: false,
      parseOptions: {
        preserveWhitespace: 'full',
      }
    });
  }
});

onBeforeUnmount(() => editor.value?.destroy());
</script>

<template>
  <div class="border rounded-sm transition-shadow
  bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700">
    <div v-if="editor && editable !== false"
         class="sticky top-11 z-10 flex flex-wrap gap-1 px-2 py-1 bg-gray-50
         dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
      <button type="button" @click="editor.chain().focus().toggleBold().run()"
              :class="{'bg-gray-200 dark:bg-zinc-700': editor.isActive('bold')}"
              class="control-header-button">
        <IconBold class="theme-icon h-3.5 w-auto"/>
      </button>

      <button type="button" @click="editor.chain().focus().toggleItalic().run()"
              :class="{'bg-gray-200 dark:bg-zinc-700': editor.isActive('italic')}"
              class="control-header-button">
        <IconItalic class="theme-icon h-3.5 w-auto"/>
      </button>

      <button type="button" @click="editor.chain().focus().toggleUnderline().run()"
              :class="{'bg-gray-200 dark:bg-zinc-700': editor.isActive('underline')}"
              class="control-header-button">
        <IconUnderline class="theme-icon h-3.5 w-auto"/>
      </button>

      <div class="w-px h-6 bg-gray-300 dark:bg-zinc-600 mx-1 self-center"></div>

      <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
              :class="{'bg-gray-200 dark:bg-zinc-700': editor.isActive('bulletList')}"
              class="control-header-button">
        <IconBulletList class="theme-icon h-6 w-auto"/>
      </button>

      <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
              :class="{'bg-gray-200 dark:bg-zinc-700': editor.isActive('orderedList')}"
              class="control-header-button">
        <IconNumberedList class="theme-icon h-6.5 w-auto"/>
      </button>
    </div>

    <EditorContent :editor="editor"/>
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
@reference '@/style.css';

// we need to style the Placeholder specifically according to TipTap docs.
:deep(.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}

.control-header-button {
  @apply p-1.5 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition text-gray-700 dark:text-gray-200;
}
</style>