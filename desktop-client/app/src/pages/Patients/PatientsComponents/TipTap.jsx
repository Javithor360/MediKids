import { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import moment from 'moment';
import '../../../assets/scss/TipTap_Style.scss'
import React from 'react'
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaRulerHorizontal,
  FaUndoAlt,
  FaRedoAlt,
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaAlignJustify
} from "react-icons/fa"
import { useLocation } from 'react-router-dom';
import { getPatientAge } from '../../../utils/Functions';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='h-[3rem] inline-flex gap-4 items-center justify-between w-full px-5'>
      <div className='flex gap-5'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaItalic/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaStrikethrough/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaHeading />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaHeading className='text-[0.9rem]'/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaHeading className='text-[0.7rem]'/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaQuoteLeft />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className='border border-[#BBBBBB] rounded p-1'>
          <FaRulerHorizontal />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaAlignRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? 'border border-[#D8D7FE] bg-[#D8D7FE] text-[#A375FF] rounded p-1' : 'border border-[#BBBBBB] rounded p-1'}
        >
          <FaAlignJustify />
        </button>
      </div>
      <div className='flex gap-2'>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
          className='border border-[#BBBBBB] rounded p-1'
        >
          <FaUndoAlt />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
          className='border border-[#BBBBBB] rounded p-1'
        >
          <FaRedoAlt/>
        </button>
      </div>
    </div>
  )
}

const TipTap = ({setNotes, setHtmlNotes}) => {
  const location = useLocation();
  const { patient } = location.state || {};

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    onUpdate: ({editor}) => {
      const html = editor.getHTML();
      const htmlText = editor.getText();
      const startIndex = htmlText.indexOf('Anotaciones generales:') + 'Anotaciones generales:'.length;
      const endIndex = htmlText.length;
      const generalAnnotation = htmlText.substring(startIndex, endIndex).trim();
      setNotes(generalAnnotation);
      setHtmlNotes(html);
    },
    content: `
      <h3 style="text-align: center;">MediKids</h3>
      <hr>
      <p style="font-weight: normal; text-align: left;"><b>Hora de inicio:</b> ${moment().format('LT')}&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp; <b>Fecha: </b> ${moment().format('MM/DD/YYYY')}</p>
      <p style="font-weight: normal; text-align: left;"><b>Nombre del Paciente:</b> ${patient.First_Names} ${patient.Last_Names} &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp; <b>Edad:</b> ${getPatientAge(patient.Age, patient.Birthdate)}</p>
      <hr>
      <p style="font-weight: bold; text-align: left;">Síntomas Previos:</p>
      <ul style="">
        <li></li>
      </ul>
      <hr>
      <p style="font-weight: bold; text-align: left;">Anotaciones generales: </p>
    `,
  });

  return (
    <>
    <div className='textEditorContainer'>
      <MenuBar editor={editor} />
      <div className='editor-content'>
        <EditorContent editor={editor} className='h-[20rem]' />
      </div>
    </div>
    <div>
  </div>
  </> 
  );
};

export default TipTap;
