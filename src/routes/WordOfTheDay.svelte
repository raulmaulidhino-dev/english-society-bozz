<script lang="ts">
  import { onMount } from 'svelte';
  import type { DictionaryAPIResponse } from '$lib/types/dictionaryapi/dictionaryapi';

  import { Icon, SpeakerWave as SpeakerIcon } from 'svelte-hero-icons';

  import AOS from 'aos';
  import 'aos/dist/aos.css';

  interface JSONRes {
    words: string[];
  }

  let word: string = '';
  let data: DictionaryAPIResponse | null = null;
  let error: string | null = null;

  let audio: HTMLAudioElement;
  let isPlaying: boolean = false;

  function toggleAudio() {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    isPlaying = !isPlaying;
  }

  onMount(async () => {
    try {
      const res = await fetch('/words/words.json');
      const json: JSONRes = await res.json();
      const dayIndex: number = new Date().getDate() % json.words.length;
      word = json.words[dayIndex] ?? "society";

      const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const dictData = await dictRes.json();
      data = dictData[0];
    } catch (err) {
      error = 'Failed to load the word of the day.';
      console.error(err);
    }

    AOS.init({
        duration: 1200
    });

  });
</script>

<article data-aos="zoom-in" class="px-6 md:px-8 py-[5rem] md:pt-[3rem] bg-white rounded border-y-2 max-w-2xl mx-auto md:border-2 md:rounded-xl md:mb-[5rem] md:shadow-lg">
  <h2 class="text-xl text-primary font-bold mb-2">Word of the Day!</h2>

  {#if error}
    <p class="text-red-500">{error}</p>
  {:else if !data}
    <p>Loading the word...</p>
  {:else}
    <p class="text-2xl font-semibold italic mb-1 flex items-center gap-2">
      <a href={data.sourceUrls[0]} target="_blank" class="hover:underline hover:decoration-secondary" title="Open source link">{data.word}</a>
      <button onclick={toggleAudio} class="text-gray-500 hover:text-blue-500"><Icon src={SpeakerIcon} size="24" /></button>
    </p>
    <p class="text-gray-600 mb-2">{data.phonetics?.[0]?.text}</p>
    <audio bind:this={audio} src={data.phonetics?.[0]?.audio} class="hidden"></audio>
    <p class="mt-4 text-sm"><span class="italic font-bold text-blue-500">{data.meanings?.[0]?.partOfSpeech}</span> {data.meanings?.[0]?.definitions?.[0]?.definition}</p>
    {#if data.meanings?.[0]?.definitions?.[0]?.example}
      <p class="text-sm text-gray-500 mt-2">Example: {data.meanings[0].definitions[0].example}</p>
    {/if}
  {/if}
</article>