// De Diego Toral en http://pastebin.com/Md65QLnT
// Funciona con gjs g.js 

const Gtk = imports.gi.Gtk;
const GLib = imports.gi.GLib;

// Initialize the gtk
Gtk.init(null, 0);

let mwindow = new Gtk.Window ({type : Gtk.WindowType.TOPLEVEL});
let label = new Gtk.Label ({label : "Hola k ase"});

// Set the window title
mwindow.title = "Hola k ase";
mwindow.connect ("destroy", function(){Gtk.main_quit()});

// Add the label
mwindow.add (label);

// Show the widgets
label.show ();
mwindow.show();

Gtk.main();