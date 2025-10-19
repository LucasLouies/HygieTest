# HygieTest
Epreuve technique hygie

# Installation

## Setup de la DB
La db de ce projet a été mis en place avec [pgadmin4](https://www.pgadmin.org/download/) (et donc [posgresql](https://www.pgadmin.org/download/))
Il faut dans un premier temps télécharger ces deux éléments.

Sur pgAdmin, utilisez votre clic droit sur la partie gauche de votre écran afin de créer un nouveau Server Group (Create => Server Group). Nommez le "Hygie".
Ensuite, clic-droit sur "Hygie" puis Register => Server. Donnez comme nom "HygieTest", comme Hostname/address "localhost", comme port "5432" et comme password "1234" (très sécurisant).

Maintenant, il va falloir lancer le backend afin de créer les tables de la db. J'ai utilisé [Visual Studio 2022](https://visualstudio.microsoft.com/fr/vs/) (à télécharger mais je suppose que vous l'avez déjà). Ouvrez le => "Ouvrir un projet ou une solution" => Naviguez dans le dossier du projet => HygieTestAPI => cliquez sur HygieTestAPI.sln.
Quand le projet est ouvert, appuiez sur l'onlet "Outils" => Gestionnaire de Package NuGet => Console du gestionnaire de package. Une console va s'ouvrir. 
Entrez la commande suivante dans cette derniere :

```bash
update-database
```

## Lancement du backend
Reprenez Visual Studio 2022 avec la solution backend et appuyez sur le signe de lecture vert.

## Lancement du frontend
Ouvrez le projet dans [Visual Studio Code](https://code.visualstudio.com/), ouvrez une console dans le dossier HygieTestFront et entrez :

```bash
npm run dev
```
le front tournera sur votre [localhost:5173](http://localhost:5173/).

## optionnel
je conseille d'utiliser l'extension better comments de Aaron Bond du marketplace de visual studio afin de profiter des commentaires !