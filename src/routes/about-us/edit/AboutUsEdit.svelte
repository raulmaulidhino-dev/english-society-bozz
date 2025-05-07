<script lang="ts">
  import axios from "axios";
  import { db } from "$lib/supabase";
  import { BACKEND_URL } from '$lib/config/config';

  import { goto } from "$app/navigation";

  import ESBozzLogo from '$lib/images/logos/es-bozz-logo-transparent.webp';
  import ESBozzLogo_fallback from '$lib/images/logos/es-bozz-logo-transparent.png';
  import SmansaLogo from '$lib/images/logos/sman1bobotsari-logo.webp';
  import SmansaLogo_fallback from '$lib/images/logos/sman1bobotsari-logo.png';

  import Notification from '$lib/components/Notification.svelte';
  import InfoModal from '$lib/components/modals/InfoModal.svelte';

  import { Icon, PlusCircle as AddIcon, Trash as RemoveIcon, Link as URL_Icon, CheckCircle as SubmitIcon } from 'svelte-hero-icons';

  import type { ESBozzData } from "$lib/types/esbozz/data/esbozz";
  import type { ESBozzOfficers } from "$lib/types/esbozz/officer/officers";
  import type { ErrorResponse } from "$lib/types/error/error";

  interface Props {
    esbozzData: ESBozzData;
    esbozzOfficers: ESBozzOfficers;
  }

  let { esbozzData, esbozzOfficers }: Props = $props();

  let showModal: boolean = $state(false);

  let esbozzFocus: string = $state(esbozzData.focus);
  let esbozzMission: string = $state(esbozzData.mission);
  let joinUsUrl: string | null = $state(esbozzData.join_us_url);

  let president: string = $state(esbozzOfficers.president ?? "");
  let vicePresident: string = $state(esbozzOfficers.vice_president ?? "");
  let secretary1: string = $state(esbozzOfficers.secretary_1 ?? "");
  let secretary2: string = $state(esbozzOfficers.secretary_2 ?? "");
  let treasurer1: string = $state(esbozzOfficers.treasurer_1 ?? "");
  let treasurer2: string = $state(esbozzOfficers.treasurer_2 ?? "");

  interface OfficerInput {
    label: string;
    id: string;
    value: string;
  }

  let activities: string[] = $state(esbozzData.activities);

  function addActivity() {
    activities = [...activities, ""];
  }

  function removeActivity(index: number) {
    activities = activities.filter((_, i) => i !== index);
  }

  let officerInputs: OfficerInput[] = $state([
    { label: "President", id: "president", value: president },
    { label: "Vice President", id: "vice_president", value: vicePresident },
    { label: "Secretary I", id: "secretary_1", value: secretary1 },
    { label: "Secretary I", id: "secretary_2", value: secretary2 },
    { label: "Treasurer I", id: "treasurer_1", value: treasurer1 },
    { label: "Treasurer I", id: "treasurer_2", value: treasurer2 },
  ]);

  let isOpenRegist: boolean = $derived(joinUsUrl ? true : false);

  let errorMsg: string | null = $state(null);

  let notificationMessage: string = $state("");
  let notificationType: string = $state("");
  let showNotification: boolean = $state(false);

  async function handleSubmit(event: SubmitEvent): Promise<void> {

    event.preventDefault();

    errorMsg = null;

    const {
        data: { session }
    } = await db.auth.getSession();
    const token = session?.access_token ?? null;

    // Submitting ESBozz Data

    try {
        const res1 = await axios.put(`${BACKEND_URL}/esbozz/data`,
                {
                  focus: esbozzFocus,
                  mission: esbozzMission,
                  join_us_url: isOpenRegist ? joinUsUrl : null,
                  activities,
                },
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                    } 
                }
        );

        notificationMessage = res1.data.message;
        notificationType = "success";
        showNotification = true;

        const res2 = await axios.put(`${BACKEND_URL}/esbozz/officers`,
                {
                  president: officerInputs[0].value,
                  vice_president: officerInputs[1].value,
                  secretary_1: officerInputs[2].value,
                  secretary_2: officerInputs[3].value,
                  treasurer_1: officerInputs[4].value,
                  treasurer_2: officerInputs[5].value,
                  it_manager_1: "",
                  it_manager_2: "",
                  officers: ["", ""],
                },
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                    } 
                }
        );

        notificationMessage = res2.data.message;
        notificationType = "success";
        showNotification = true;

        setTimeout(() => {
            goto("/about-us", { replaceState: true });
        }, 3000);

    } catch (error) {
        if (axios.isAxiosError<ErrorResponse>(error)) {
            errorMsg = error?.response?.data?.message || "Unknown Error";

            notificationMessage = errorMsg;
            notificationType = "error";
            showNotification = true;
        }
    }
  }

</script>

<form onsubmit={handleSubmit} class="bg-slate-200 md:p-8 mx-auto px-4 py-8 md:py-12 md:px-10 space-y-8">
<div class="text-center bg-white pt-16 pb-8 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
  <h1 class="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
  <p class="text-lg text-gray-600">
    Welcome to <strong class="font-semibold">English Society</strong>, a passionate group of English learners dedicated to: <br />
    <textarea id="esbozzFocus" name="esbozzFocus" placeholder="ESBozz Focus" rows="4" cols="50" bind:value={esbozzFocus} minlength="10" maxlength="255" onkeydown={(event) => {if (event.key === "Enter") event.preventDefault()}} required aria-required="true" autocomplete="off" class="text-md w-full border-[1px] rounded-lg p-4 mt-4 focus:border-primary focus:outline-none disabled:text-slate-400 resize-none"></textarea>
  </p>
</div>

<div class="text-center bg-white py-8 px-6 max-w-sm rounded-2xl mx-auto shadow-lg">
  <div>
    <picture>
        <source type="image/webp" srcset={ESBozzLogo} />
        <img src={ESBozzLogo_fallback} alt="English Society-Bozz logo" loading="lazy" class="w-full">
    </picture>
  </div>
</div>

<div class="bg-white py-8 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
  <h2 class="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
  <p class="text-gray-600 text-base">
    Our mission is to: <br />
    <textarea id="esbozzFocus" name="esbozzFocus" placeholder="ESBozz Focus" rows="6" cols="50" bind:value={esbozzMission} minlength="10" maxlength="255" onkeydown={(event) => {if (event.key === "Enter") event.preventDefault()}} required aria-required="true" autocomplete="off" class="text-md w-full border-[1px] rounded-lg p-4 my-4 focus:border-primary focus:outline-none disabled:text-slate-400 resize-none"></textarea>
    We aim to foster a culture of collaboration, leadership, and meaningful growth.
  </p>
</div>

<div class="bg-white py-8 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
  <h2 class="text-2xl font-semibold text-gray-800 mb-2">What We Do</h2>
  <ol id="activity_container" class="text-gray-600 space-y-4">
    {#each activities, i}
      <li class="flex flex-col justify-end items-center gap-2">
        <textarea placeholder="Enter activity ..." rows="4" cols="50" bind:value={activities[i]} minlength="5" maxlength="255" onkeydown={(event) => {if (event.key === "Enter") event.preventDefault()}} required aria-required="true" autocomplete="off" class="text-md w-full border-[1px] rounded-lg p-4 mt-4 inline-block focus:border-primary focus:outline-none disabled:text-slate-400 resize-none"></textarea>
        <button type="button" onclick={() => removeActivity(i)} class="text-red-500 bg-slate-200 p-2 rounded-md inline-block ml-auto"><Icon src={RemoveIcon} size="20" /><div>
      </li>
    {/each}
  </ol>
  <button type="button" onclick={addActivity} class="text-md bg-gray-200 w-full border-[1px] rounded-lg p-4 mt-6 flex justify-betweeen items-center"><div class="font-medium">Add Activity</div><Icon src={AddIcon} size="26" class="ml-auto text-primary" /></button>
</div>

<div class="bg-white py-8 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
  <h2 class="text-2xl font-semibold text-gray-800 mb-2">Our Recent Officers</h2>
  <ul class="text-gray-600 space-y-3">
    {#each officerInputs as input}
      <li>
        <span class="font-semibold text-primary text-sm"><label for={input.id}>{input.label}:</label></span> <input id={input.id} name={input.id} bind:value={input.value} minlength="3" maxlength="100" required aria-required="true" autocomplete="off" class="text-lg w-full border-b-[1px] pb-1 focus:border-primary focus:outline-none disabled:text-slate-400" />
      </li>
    {/each}
  </ul>
</div>

<div class="text-center bg-white max-w-sm py-8 px-6 md:py-12 md:px-10 rounded-2xl mx-auto shadow-lg">
  <div>
    <picture>
        <source type="image/webp" srcset={SmansaLogo} />
        <img src={SmansaLogo_fallback} alt="SMA Negeri 1 Bobotsari logo" loading="lazy" class="w-full"/>
    </picture>
  </div>
</div>

<div class="text-center bg-white py-8 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
  <h2 class="text-2xl font-semibold text-gray-800 mb-2">Get Involved</h2>
  <p class="text-gray-600 mb-4">
    We’re always excited to welcome new members. Reach out through our <a href="https://www.instagram.com/englishsocietybozz/" target="_blank" class="text-blue-600 hover:underline">Instagram</a> and connect with us on social media!
  </p>
  {#if joinUsUrl}
      <a href={joinUsUrl} target="_blank" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">JOIN US</a>
  {:else}
      <button type="button" onclick={() => showModal = true} class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">JOIN US</button>
  {/if}
  <hr class="my-8" />
  <h3 class="mt-4 font-bold">Open Registration?</h3>
  <div class="bg-gray-100 p-4 mt-6 rounded-lg flex flex-col justify-start items-start gap-4">
    <label class="text-sm flex gap-1 items-center"><input type="radio" bind:group={isOpenRegist} value={true} />
      <span>Yes</span>
    </label>
    {#if isOpenRegist}
      <div class="flex items-center gap-2">
        <Icon src={URL_Icon} size="26" class="text-blue-600 hover:scale-125 hover:text-blue-900 transition-all duration-300 ease-in-out" />
        <input type="url" bind:value={joinUsUrl} placeholder="Enter registartion link..." required aria-required="true" autocomplete="off" class="text-sm w-full border-[1px] rounded-sm p-2 focus:border-primary focus:outline-none disabled:text-slate-400" />
      </div>
    {/if}
    <label class="text-sm flex gap-1 items-center"><input type="radio" bind:group={isOpenRegist} value={false} />
      <span>No</span>
    </label>
  </div>
</div>
<button type="submit" title="Submit Changes" class="text-primary bg-secondary p-4 border-secondary border-2 rounded-full fixed z-[999] right-4 bottom-4 shadow-xl hover:bg-primary hover:text-secondary">
  <Icon src={SubmitIcon} size="40" />
</button>
</form>

{#if showNotification}
    <Notification message={notificationMessage} type={notificationType} duration={5000} />
{/if}

<InfoModal
show={showModal}
title={"Information"}
message={"Thank you for your interest. At this time, we're not accepting new members. Please check back at the start of the new school year for future opportunities! 💙"}
OK_label={"OK, GOT IT!"}
OK_event={() => showModal = false}
/>
