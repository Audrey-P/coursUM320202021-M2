# Choisis ton orientation

# Descriptif du projet
L'application "choisis ton orientation" permet d'effectuer des recherches sur les établissements d'enseignement supérieur dans une région donnée.  
Elle permet de connaitre les établissements les plus ou moins demandés par rapport aux effectifs finalement accueillis. Cela permet notamment aux étudiants d'identifier les établissements dans lesquels la demande est peu importante et/ou le taux de remplissage faible de façon à les orienter vers ceux dans lesquels l'admission sera potentiellement plus facile.

# API utilisées
Nous avons utilisé deux APIs pour réaliser cette application :

API 1 : Une API "ParcourSup" contenant des données, pour chaque établissement de l'enseignement supérieur français, sur les demandes effectuées par les étudiants via l'application Parcoursup en 2019. Nous avons décidé de ne conserver que le nombre total de demandes (toutes filières confondues).

Liste exhaustive des variables conservées lors du fetch :
- "cod_uai": Code unique de chaque établissement, (jointure)
- "capa_fin": Capacité de l’établissement par formation (Somme pour chaque établissement)
- "voe_tot": Effectif total des candidats pour une formation (Somme pour chaque établissement)
- "acc_tot": Effectif total des candidats ayant accepté la proposition de l’établissement (admis) (Somme pour chaque établissement)

Lien vers l'API : https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-parcoursup/api/?timezone=Europe%2FBerlin&sort=tri&fbclid=IwAR1tgqO8jPdLlWfrRAJ1Jx7YKHLOpnTCyJqLUK4_OaSgRr9NM8SSoV9cX0U 

API 2 : Une API "Effectif des établissements du supérieur" contenant des données sur les établissements d'enseignement supérieur en France et notamment le nombre d'élèves inscrits. Nous avons conservé de cette API les informations décrivant les établissements (nom, region d'implantation,etc. ). 

Liste exhaustive des variables conservées lors du fetch :
- "etablissement":Code unique de chaque établissement, (jointure)
- "com_etab_lib": Commune de l'établissement
- "reg_etab_lib": Région de l'établissement,
- "reg_etab": Code région de l'établissement,
- "element_wikidata": Lien vers les informations liées à l'établissement sur Wikipedia,
- "etablissement_lib": Nom complet de l'établissement,
- "etablissement_type_lib": Type détablissement détaillé (ex: "Universités pluridisciplinaires avec santé"),
- "effectif": Effectif des inscrits (Somme pour chaque établissement)

Lien vers l'API : https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-statistiques-sur-les-effectifs-d-etudiants-inscrits-par-etablissement/api/?sort=-rentree&rows=100&refine.rentree_lib=2018-19&refine.localisation_etab=Occitanie 

L'API Parcoursup contenant uniquement des données sur la session 2019, nous avons décidé de ne conserver que l'année scolaire 2018-2019 de l'API sur les effectifs.

Les données des deux APIs sont reliées entre elles via le CODE établissement contenu dans chacune des deux bases. Le fichier ainsi obtenu contient une ligne par établissement, contenant l'ensemble des informations listées ci-dessus ainsi qu'une variable calculée à partir de l'effectif (API Effectif) et du nombre de demandes (API Parcoursup). 

# Diagramme de classes

![alt text](/docs/images/diag_classes.png)

# Diagramme entités relations

![alt text](/docs/images/diag_e_r.png)

# Requêtes
Nous avons deux différentes routes :
 - GET /rdfvocabulary renvoie le vocabulaire rdf 
 - GET /univs/:region renvoie des informations sur les universités de la région selectionnée

# Lien vers l'application

https://cours20202021m2.herokuapp.com/ 
