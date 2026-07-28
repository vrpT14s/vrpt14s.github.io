---
layout: post
title:  "Learning about WebGPU"
date:   2026-07-27 12:51:31 +0530
categories: webgpu video-games browser js
---

<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>

Organizations have a need for developers. Individuals have less of such a need. This is troublesome from an educational standpoint. How are you going to learn to program if you personally don't have any use for it? You'll have to slog through a period of doing work that doesn't benefit you until you get employed. (And although I like learning on the job, it has its limits too). Now, individual users do need things like operating systems and music players and so on. But if you don't want to specialize in something like that, and learn the ins and outs of codecs and audio devices, then you're back to square one because you won't be developing them. 

There is an exception to that and that's video games. Graphics programming has always been the apex of programming for fun in my eyes. There's not as much special information you need to know about (this might be a lie). You have to touch lots of things from networking to schema design to security. Some of it has to be performant and there's a real difference to how you interact with your data algorithmically. There's clear obvoius feedback to making things lighter because everything is about either user experience or keeping server costs down. 

More importantly, video games are interesting to people who don't know (or don't care) about what it does internally. That includes you a few years down the line. I admit I might be biased because I like the concept of video games very much (even though I barely ever play video games these days). If every computer in the world except my laptop blew up into flames and everyone else became allergic to the idea of computing, the idea of playing a video game would still hold as much sway it does to me now. Large volume OLAP data-querying, for example, wouldn't be as prominent of a topic in my mind in comparison.

Why WebGPU?
---

I've never made a game before. I think it's because singleplayer games are a bit boring to make. If I'm the only one who's going to be playing it, I mean. Then it would be more interesting to do something like a simulation. But even then, there are a lot of cool networking problems with multiplayer games that aren't a factor on a single computer. Some challenges are things I want to deal with (low-latency networking, distributed state etc.) while others I would rather do without (realistic art, 4k textures, controller-support).

So I thought I'd make a multiplayer game. Downloading game assets is annoying (and a security issue since it could be malware), you can't just link it to someone like a website. You have to worry about packaging for windows vs linux, updated libraries, different rendering API's on the programmer's side. Even when you put all that aside you still have to deal with a million small libraries to load things. I thought I would make it in C++ but networking there is a little bit of a pain in the ass. There's a reason people don't usually write website backends in C++. If the whole program was about very high-performance networking it might make sense (or C instead) but I don't think it is. The advantage of C++ is that I already was pretty used to OpenGL there. OpenGL has a lot of cruft involved in it though so I wasn't jumping with joy for it either however. I heard of wgpu so I tried Rust instead and the issue there is that firstly the ecosystem is not as developed, the libraries aren't as mature as C++, and secondly, graphics in general seems just like a pain there. I want to be able to write shitty code sometimes that might not work. It's fine to write flaky graphics code because the stakes are low. 

I learnt this when I tried writing a GUI in Rust. I tried a lot of things and all of them were terrible for me. I realized in the end that the source of chaos in frontend webdev is not javascript but in the task of UI (and the usual business circumstances that surround its development). And that's what it was originally made for, the fact that people use it for backend is as unplanned as using bash for that, so it would be unfair to criticize the original language design for it.

So that's why I thought I should write graphics in javascript with WebGPU. It'll be as easy to open as a website (since it is one), and javascript is as good as any if we're talking about the user interaction part (at least for the kind of not-very-demanding graphics I'm imagining for this game. I'm not making crysis here). It is possible to have rust in the browser through WASM if I do want something performant, but the issue is that WASM code can't drive WebGPU directly, you'll need glue code in between. So javascript will only be there for the UI and the graphics and later on when I want to add fancy things like client-side prediction to make network latency less noticeable, I can use the same physics library from Rust and just drop it in there as WASM. But trying to make Rust do everything is too much of a headache for me, since I'm new to WASM too.

Some small programs
---

### 1. HTML Canvas test

To start with, here's to make sure I can add an HTML canvas to jekyll (the blog generator):

<canvas id="canvasDemo1" width="600" height="400"></canvas>
<script src="{{ '/assets/js/demo1.js' | relative_url }}"></script>

To include it, I added a canvas with an id of canvasDemo1 (fixed height and width so we don't need to mess with CSS) along with this script:

<pre class="line-numbers"><code id="demo1-source" class="language-javascript"></code></pre>
<script>
fetch('{{ "/assets/js/demo1.js" | relative_url }}')
  .then(r => r.text())
  .then(src => {
    document.getElementById('demo1-source').textContent = src;
    Prism.highlightElement(document.getElementById('demo1-source'));
  });
</script>

It just draws a solid rectangle and a border 30 times a second. The formula for the x/y coords was pretty random.

