# How to install Ancient Dungeon VR Mods on a Meta Quest
![Note: This tutorial is made for a Quest 3 (standalone) and Windows](https://img.shields.io/badge/NOTE-This_tutorial_is_made_for_a_Quest_3_(standalone)_and_Windows.-fc3232)
## Connecting your PC to your Quest
For this, you need a USB C cable capable of transferring data. The charger that comes with the Quest 3 can do this.
You may also need a USB C to USB A adapter. You can buy one for very cheap on Amazon or something.

Once you have your cable and adapter, plug the cable into the adapter, and the adapter into your computer.

Now turn on your Quest. Once it powers on, plug the cable into the Quest's charging port. You should see a notification on the quest talking about allowing the connected device to access files. Click the notification. *You have to keep the cable plugged in until your mods are fully transferred over.*

**If you don't see a notification talking about files, and only one talking about Oculus Link, you need to [enable developer mode.](https://rbryanyt.github.io/tutorials/quest_dev_mode)**

Now you should see either Windows AutoPlay or a new file explorer window at your Quest. If you see AutoPlay, choose to view files in File Explorer.

Now go to `Internal shared storage/Android/data/de.erthu.ancientdungeonfull/files`.

If you don't see a `ADVR_Mods` folder, create it. **(The folder must be capitalized just like that because of Quest's filesystem.)**

Now drag and drop your mod folders to install them. **(DO NOT UNPLUG THE QUEST UNTIL THE COPY ACTION IS COMPLETE!)**

You should now have mods installed for your Ancient Dungeon VR!

## Where to enable mods
To enable mods, just open the game and look right in the settings menu.

Click any mod to enable/disable it, and reload game to apply changes.

## I don't see any mods
### Zip folder pain
Look inside of `ADVR_Mods/<the mod you installed>` and see if there is a `mod.modinfo` file.

If there isn't, try reinstalling the mod with whatever folder contains the `mod.modinfo` file.
### Wrong location
Did you make the `ADVR_Mods` folder, if so, did you put the mods inside of it?

Did you go to `Android/de.erthu.ancientdungeonfull`? The package name for the beta is very similar but without the word *full*.

If you didn't do both of these, try redoing the process with the location in the tutorial **exactly**.
### Mod incompatibility
Have you checked if the mod is compatible with whatever version of the game you are using?

If it isn't, that's why it isn't showing.

---

***This tutorial doesn't cover PCVR, sorry!***
