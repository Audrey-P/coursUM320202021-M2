# Choisis ton orientation

# Descriptif du projet
L'application "choisis ton orientation" permet d'effectuer des recherches sur les établissements d'enseignement supérieur dans une région donnée.  
Elle permet de connaitre les établissements les plus ou moins demandés par rapport aux effectifs finalement accueillis. Cela permet notamment aux étudiants d'identifier les établissements dans lesquels la demande est peu importante et/ou le taux de remplissage faible de façon à les orienter vers ceux dans lesquels l'admission sera potentiellement plus facile.

# API utilisées
Nous avons utilisé deux APIs pour réaliser cette application :

- Une API "ParcourSup" contenant des données, pour chaque établissement de l'enseignement supérieur français, sur les demandes effectuées par les étudiants via l'application Parcoursup. Nous avons décidé de ne conserver que le nombre total de demandes (toutes fillières confondues) ainsi que le nombre de voeux acceptés comptabilisés pour chaque établissement.

Liste exhaustive des variables conservées lors du fetch :
#### "cod_uai": Code unique de chaque établissement, (jointure)
## "session": Année 2019,
## "lien_form_psup": Lien vers les informations liées à l'établissement sur le site de ParcourSup,
## ""capa_fin": Capacité de l’établissement par formation (Somme pour chaque établissement)
## "voe_tot": Effectif total des candidats pour une formation (Somme pour chaque établissement)
## "nb_voe_pp": Effectif total des candidats en phase principale (Somme pour chaque établissement)
## "nb_voe_pc": Effectif total des candidats en phase complémentaire (Somme pour chaque établissement)
## "acc_tot": Effectif total des candidats ayant accepté la proposition de l’établissement (admis) (Somme pour chaque établissement)
## "acc_pp": Effectif des admis en phase principale (Somme pour chaque établissement)
## "acc_pc": Effectif des admis en phase complémentaire (Somme pour chaque établissement)

- Une API "Effectif des établissements du supérieur" contenant des données sur les établissements d'enseignement supérieur en France et notamment le nombre d'élèves inscits. Nous avons conservé de cette API les informations décrivant les établissements (nom, region d'implantation,etc. )
Liste exhaustive des variables concervées lors du fetch :
"etablissement":Code unique de chaque établissement, (jointure)
"rentree": date de rentrée (ici 2018),
"aca_etab_lib": Académie de l'établissement,
"com_etab_lib": Commune de l'établissement
"reg_etab_lib": Région de l'établissement,
"element_wikidata": Lien vers les informations liées à l'établissement sur Wikipedia,
"dep_etab_lib": Département de l'établissement,
"etablissement_lib": Nom complet de l'établissement,
"etablissement_type_lib": Type détablissement détaillé (ex: "Universités pluridisciplinaires avec santé"),
"etablissement_type2": Type d'établissement (université, IUT, etc.),
"effectif_total": Effectif des inscrits (Somme pour chaque établissement)

L'API Parcoursup contenant uniquement des données sur la session 2019, nous avons décidé de ne concerver que l'année scolaire 2018-2019 de l'API sur les effectifs.

Les données des deux bases de données sont reliées entre elles via le CODE établissement contenu dans chacune des deux bases. Le fichier ainsi obtenu contient une ligne par établissement, contenant l'ensemble des informations listées ci-dessus ainsi qu'une variable calculée à partir de l'effectif (API Effectif) et du nombre de demandes (API Parcoursup). 

# Requêtes
Nous avons deux différentes routes :
GET/univs renvoie la collection des universités en France
GET/user/:region renvoie des informations sur les universités de la région selectionnée

_________________________________________________________

# coursUM320202021-M2

# Descriptif du projet
Par groupes de 5 : développer un serveur node.js hébergé sur heroku qui fournit un jeu de données produit par le croisement d'au moins de jeux de données récupérés sur le Web. Le code projet sera hébergé sur github en fork de ce projet support de cours.
Vous fournirez dans le README de votre projet :
* explication du choix des sources de données et de comment vous les utilisez ( quelles requêtes vous faites )
* comment vous liez les données entre elles
Vous fournirez également votre API de sortie :
* quelles URL proposées par votre serveur permettent de récupérer quelles données
* les données devront être accessibles dans au moins deux formats ( JSON et RDF ) et votre API devra respecter les principes de la négoctiation de contenu server-driven
Il faudra que vos données soient bien ouvertes c'est à dire format explicite, données complètes, et facilement accessiibles ( politique CORS permissive ).


Vous proposerez une interface cliente ( codes HTML JS client ) hébergée en githubpage consommatrice de votre API.

Vous serez évalués sur : la qualité du code,la pertinence du jeu de données, la pertinence des choix de sources de données, la pertinence de la solution de jointure entre les jeux de données, votre bon usage de github et des pull request.


# OpenData

C'est quoi ? Le fait d'ouvrir ses données. Mais il y a des niveaux de qualité dans l'ouverture des données : faciles d'accès, bien structurées, modèle explicite, droit légal de réutilisation.


Quelles sont les motivations ? notamment le partage de données entre scientifiques, dans le prolongement de ce pour quoi le Web et avant ça internet ont été créés. Ca rejoint la volonté de l'article As We May Think de Vanevar Bush en 1945. Mais aussi une demande citoyenne pour rendre public les données des administrations dans un contexte de démocratie et une volonté de transparence.
1. partage de grandes bases de données pour développement d’applications tierces
2. rendre les données aux producteurs de données
3. transparence sur les données produites

10 principes fondateurs ( plus ou moins respectés )
1. complètes,
2. primaires,
3. fraîches,
4. accessibles,
5. électroniquement lisibles par une machine,
6. accessibles sans discrimination,
7. disponibles sous des formats ouverts,
8. disponibles sous licences ouvertes,
9. accessibles de façon pérenne en ligne,
10. sans coût d’utilisation.

# Echelle de qualité des données ouvertes (Tim Berners-Lee)
★ Données non filtrées « dégradées », quel que soit leur format

★ ★ Données disponibles en formats structurés (tabulaires en CSV, XML, Excel, RDF)

★ ★ ★ Données libres d’être exploitées juridiquement (licences) et techniquement dans des formats non propriétaires

★ ★ ★ ★ Données accessibles via des URL afin de pouvoir pointer dessus

★ ★ ★ ★ ★ Données liées à d’autres données pour les contextualiser et les enrichir.

#La loi Lemaire

l’administration (ministères, collectivités territoriales, établissements publics...) sera dorénavant tenue, lorsqu’elle communique un document administratif au format électronique, de le mettre à disposition du citoyen « dans un standard ouvert, aisément réutilisable et exploitable par un système de traitement automatisé ». Ce droit de réutilisation vaut également pour les documents administratifs divulgués par les acteurs privés chargés d'une mission de service public à caractère industriel ou commercial. Si vous voulez des données de l’administration qui ne sont pas déjà ouvertes, il faut les demander à l’administration, si elle ne les fournit pas, vous pouvez demander au CADA  ( Commission d’Accès aux Documents Administratifs ) qui peut imposer à l’administration de vous les ouvrir … mais sous combien de temps ? La loi date de octobre 2016 et ne sera pleinement applicable que fin 2018.


