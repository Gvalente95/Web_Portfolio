import "./style.css";
import track_editor_img from "@assets/png/screenshot/daw/track-editor.png";
import keyboard_img from "@assets/png/screenshot/daw/keyboard.png";
import transport_img from "@assets/png/screenshot/daw/transport.png";
import track_lane_img from "@assets/png/screenshot/daw/track-lane.png";
import routing_img from "@assets/png/screenshot/daw/routing.png";
import mixer_img from "@assets/png/screenshot/daw/mixer.png";
import region_editor_img from "@assets/png/screenshot/daw/region-editor.png";
import midi_editor_img from "@assets/png/screenshot/daw/midi-editor.png";
import { useEffect, useState } from "react";

export function DawGuide() {
  const [activeTab, setActiveTab] = useState("creating-project");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".daw-guide__section-title[id], .daw-guide__sub-title[id]"));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveTab(visible.target.id);
      },
      {
        root: document.querySelector(".projects-page__grid"),
        threshold: 0,
        rootMargin: "0px 0px -90% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-container">
      <div className="daw-guide-layout">
        <aside className="daw-guide__toc">
          <div className="daw-guide__toc-title">Table of content</div>
          <a className={activeTab === "creating-project" ? "active" : ""} href="#creating-project">
            Creating a Project
          </a>
          <a className={activeTab === "loading" ? "active" : ""} href="#loading">
            Loading a Project
          </a>
          <a className={activeTab === "saving" ? "active" : ""} href="#saving">
            Saving a Project
          </a>
          <a className={activeTab === "layout" ? "active" : ""} href="#layout">
            Layout
          </a>

          <div className="daw-guide__toc-sublist">
            <a className={activeTab === "top-panel" ? "active" : ""} href="#top-panel">
              Top Panel
            </a>
            <div className="daw-guide__toc-sublist">
              <a className={activeTab === "transport" ? "active" : ""} href="#transport">
                Transport
              </a>
            </div>
            <a className={activeTab === "left-panel" ? "active" : ""} href="#left-panel">
              Left Panel
            </a>
            <div className="daw-guide__toc-sublist">
              <a className={activeTab === "routing" ? "active" : ""} href="#routing">
                Routing
              </a>
              <a className={activeTab === "track-editor" ? "active" : ""} href="#track-editor">
                Track Editor
              </a>
            </div>

            <a href="#bottom-panel">Bottom Panel</a>
            <div className="daw-guide__toc-sublist">
              <a className={activeTab === "midi-editor" ? "active" : ""} href="#midi-editor">
                Midi Editor
              </a>
              <a className={activeTab === "mixer" ? "active" : ""} href="#mixer">
                Mixer
              </a>
              <a className={activeTab === "region-editor" ? "active" : ""} href="#region-editor">
                Region Editor
              </a>
            </div>

            <a className={activeTab === "right-panel" ? "active" : ""} href="#right-panel">
              Right Panel
            </a>
          </div>

          <a className={activeTab === "track-lane" ? "active" : ""} href="#track-lane">
            Track Lane
          </a>
          <a className={activeTab === "keyboard" ? "active" : ""} href="#keyboard">
            Keyboard
          </a>
        </aside>

        <div className="daw-guide">
          <div className="daw-guide__header">
            <span className="daw-guide__title">DAW User Guide</span>
          </div>
          <div className="daw-guide__body">
            <strong>GiuDaw</strong> is an interface I built for creating, editing and mixing audio directly in the browser.
          </div>
          {/* CREATING A PROJECT */}
          <div id="creating-project" className="daw-guide__section-title">
            Creating a Project
          </div>
          <div className="daw-guide__body">
            Start by clicking <strong>New Project</strong> from the projects page. You will then then be prompted for basic project informations - name, description and visibility (whether the project
            will be viewable by your friends, anyone or just you). <br /> That's it! Your project is created as an empty template and added to your projects list.
          </div>
          {/* LOADING A PROJECT */}
          <div id="loading" className="daw-guide__section-title">
            Loading a Project
          </div>
          <div className="daw-guide__body">Select and open a project from your project list.</div>
          {/* SAVING A PROJECT */}
          <span id="saving" className="daw-guide__section-title">
            Saving a Project
          </span>
          <span className="daw-guide__sub-title--tip">
            <code>Ctrl + S</code> to save your work at any time.
          </span>
          <div className="daw-guide__body">
            Upon saving a project, a new project configuration json file is created and sent to our database, and the project's audio regions are also stored by us.
            <br /> Since the projects size can be non negligable, some restrictions are imposed: a limit of 20mb of storage is set per user, as well as a maximum projects count.
          </div>
          {/* LAYOUT */}
          <div id="layout" className="daw-guide__section-title">
            Layout
          </div>
          <div className="daw-guide__body">
            Our web daw offers the same structure you'll find in any standard daw such as Logic Pro X, Pro-tools, Ableton. <br />
            If you're already familiar with any of those, you should feel at home. if not, you can use this guide to navigate the different featurs of our daw as to better understand they're design
            and usage.
            <br />
          </div>
          {/* TOP PANEL */}
          <span id="top-panel" className="daw-guide__sub-title">
            Top Panel
          </span>
          <span className="daw-guide__sub-title--tip">
            Toggled with <code>Alt + up arrow</code>
          </span>
          <div id="transport" className="daw-guide__sub-title">
            Transport
          </div>
          <img className="daw-guide__image" src={transport_img} />
          <div className="daw-guide__body">
            <strong>Transport Bar</strong> provides the main playback controls for the project.
            <br />
            It allows you to start and stop playback, navigate the timeline, adjust the <strong>tempo (BPM)</strong>, and configure the <strong>time signature</strong>.<br />
            Additional transport options such as looping, metronome control, and timeline positioning are also available, making it the central hub for managing project playback and synchronization.
          </div>
          {/* LEFT PANEL */}
          <span id="left-panel" className="daw-guide__sub-title">
            Left Panel
          </span>
          <span className="daw-guide__sub-title--tip">
            Toggled with <code>Alt + left arrow</code>
          </span>

          <div id="routing" className="daw-guide__sub-title">
            Routing
          </div>
          <img className="daw-guide__image" src={routing_img} />
          <div className="daw-guide__body">
            Routing displays the current audio and MIDI bus mappings for the selected track. Use it to verify signal paths and inspect how modules are connected within the processing chain.
          </div>

          <div id="track-editor" className="daw-guide__sub-title">
            Track Editor
          </div>
          <img className="daw-guide__image" src={track_editor_img} />
          <div className="daw-guide__body">
            Track Editor lets you build your track's processing chain by adding modules represented as nodes. Modules can be <strong>instruments</strong>, <strong>effects</strong>, or{" "}
            <strong>MIDI transformers</strong>. Audio and MIDI data flow through the chain from left to right, with each module processing the output of the previous one before passing it to the next.
            This allows you to create complex sound and processing pipelines by combining multiple modules together.
          </div>

          {/* BOTTOM PANEL */}
          <span id="bottom-panel" className="daw-guide__sub-title">
            Bottom Panel
          </span>
          <span className="daw-guide__sub-title--tip">
            Toggled with <code>Alt + down arrow</code>
          </span>
          <div id="midi-editor" className="daw-guide__sub-title">
            Midi Editor
          </div>
          <img className="daw-guide__image" src={midi_editor_img} />
          <div className="daw-guide__body">
            <strong>Midi Editor</strong> provides a piano-roll interface for creating and editing MIDI performances.
            <br />
            Notes can be added, moved, resized, copied, and deleted directly within the editor, allowing precise control over melodies, chords, rhythms, and automation data.
            <br />
            The editor displays a timeline synchronized with the project and a piano keyboard that maps note positions to musical pitches, making it easy to visualize and modify MIDI content.
            <br />
            Additional tools allow you to adjust note properties such as velocity, timing, duration, and selection groups, helping you refine performances and correct timing issues with precision.
            <br />
            The Midi Editor is the primary workspace for composing, arranging, and editing MIDI data that drives instruments throughout your project.
          </div>
          <div id="mixer" className="daw-guide__sub-title">
            Mixer
          </div>
          <img className="daw-guide__image" src={mixer_img} />
          <div className="daw-guide__body">
            A standard <strong>Mix</strong> view of all the project tracks.
            <br />
            Used for routing track's inputs and outputs to specific <strong>buses</strong>, adding <strong>effect modules</strong>, handling send levels and other track's configurations (pan, volume,
            mute state..).
            <br />A fully <strong>parametric equalizer</strong> can be opened here, at the bottom of each track.
          </div>
          <div id="region-editor" className="daw-guide__sub-title">
            Region Editor
          </div>
          <img className="daw-guide__image" src={region_editor_img} />
          <div className="daw-guide__body">
            The Region Editor provides a set of tools tailored for audio regions, be warned that the modifications accessible here can be destructive: they directly modify the audio buffer of the
            region, meaning they are non-reversible.
            <br /> Some options are: Modify Gain, trim, invert phase, pitch correction.
          </div>
          {/* RIGHT PANEL */}
          <span id="right-panel" className="daw-guide__sub-title">
            Right Panel
          </span>
          <span className="daw-guide__sub-title--tip">
            Toggled with <code>Alt + down arrow</code>
          </span>
          <div className="daw-guide__body"></div>
          {/* TRACK LANE */}
          <div id="track-lane" className="daw-guide__sub-title">
            Track Lane
          </div>
          <img className="daw-guide__image" src={track_lane_img} />
          <div className="daw-guide__body">
            <strong>Track Lane</strong> is the main timeline workspace where tracks and regions are arranged.
            <br />
            It provides tools for creating, editing, moving, resizing, and deleting regions, as well as managing project playback through the <strong>playhead</strong> and <strong>loop bar</strong>.
            <br />
            The Track Lane also includes the <strong>timeline ruler</strong>, where event markers can be placed and assigned to keyboard shortcuts for quick navigation within a project.
            <br />
            Additional components such as the <strong>toolbar</strong>, <strong>track view</strong>, and <strong>automation lanes</strong> allow precise editing, arrangement, and automation of track
            parameters over time, making the Track Lane the central workspace for building and organizing your production.
          </div>
          {/* KEYBOARD */}
          <div id="keyboard" className="daw-guide__sub-title">
            Keyboard
          </div>
          <img className="daw-guide__image" src={keyboard_img} />
          <div className="daw-guide__body">
            When active, the Audio Keyboard maps key-presses to midi notes, it then tries to use a selected Midi track's instrument as a midi output for the played notes. If no instrument is found, a
            default synthethiser will be used. <br />
            Keys mappings are customizable, right-click on a note and press the desired key for modifying a pre-existing one.
          </div>
        </div>
      </div>
    </div>
  );
}
