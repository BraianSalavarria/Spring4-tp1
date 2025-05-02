import { body } from 'express-validator';
import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30,
     insertarSuperheroe, actualizarSuperheroe, eliminarSuperheroe, eliminarSuperheroePorNombre} from '../services/superheroesService.mjs'
import {renderizarListaSuperheroes, renderizarSuperheroe} from '../views/responseView.mjs';


export async function obtenerSuperheroePorIdController(req, res){
    try{
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if(!superheroe){
            return res.status(404).send({mensaje:"superheroe no encontrado"});
        }
        return res.status(200).json({ superheroe });
    }catch(error){
         return res.status(500).send({mensaje: "Error al obtener superheroe", error: error.message});
    }
}

export async function obtenerTodosLosSuperheroesCotroller(req, res) {
    try{
        const superheroes = await obtenerTodosLosSuperheroes();
        
        res.status(200).render('pages/listaSuperhero',{
            superheroes:superheroes,
            title:'Todos los Superheroes',
        });        
        
    }catch(error){
       return res.status(500).send({mensaje:'error al obtener los superheroes', error: error.message});
    }
}

export async function buscarSuperheroesPorAtributoController(req, res){
    try{
        const {atributo, valor} = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0){
            return res.status(404).send({mensaje:'no se encontraron superheroes con ese atributo'})
        }
    
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        return res.status(200).json(superheroesFormateados);
        
    }catch(error){
        return res.status(500).send({mensaje:'error al buscar los superheroes', error: error.message});
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try{
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if(superheroes.length === 0){
            return res.status(404).send({mensaje: 'no se encontraron superheroes mayores de 30'});
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
       return res.status(200).json(superheroesFormateados);

    }catch(error){
        return res.status(500).send({mensaje:'Error al obtener superheroes mayores de 30', error: error.message});
    }
    
}

export async function agregarSuperheroeControlloer(req, res){
try{
    const superheroe = req.body;
    const nuevoSuperheroe = await insertarSuperheroe(superheroe);
    if(nuevoSuperheroe)
    return res.status(201).json({"mensaje":"Superheroe creado con exito",nuevoSuperheroe});
    }
catch(error){
        return res.status(500).send({mensaje:'Error al insertar superheroe', error: error.message});
    }
}

export async function editarSuperheroeController(req, res){
    try{
        const {id }= req.params;
        const superheroe = req.body;   
        const superheroeActualizado = await actualizarSuperheroe(id, superheroe);
        if(!superheroeActualizado){
            return res.status(404).send({mensaje:'superheroe no encontrado'});
        }
        
        return res.status(200).json({"mensaje":"Superheroe actualizado con exito"});
    }catch(error){
        return res.status(500).send({mensaje:'Error al actualizar superheroe', error: error.message});
    }
}

export async function eliminarSuperheroeController(req, res){
    try{
        const {id} = req.params;
        const superheroeEliminado = await eliminarSuperheroe(id);
        if(!superheroeEliminado){
            return res.status(404).send({mensaje:'superheroe no encontrado'});
        }
        return res.status(200).json({"mensaje":"Superheroe eliminado con exito"});
    }catch(error){
        return res.status(500).send({mensaje:'Error al eliminar superheroe', error: error.message});
    }
}

export async function eliminarSuperheroePorNombreController(req, res){
    try{
        const {nombre} = req.params;
        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
        if(!superheroeEliminado){
            return res.status(404).send({mensaje:'superheroe no encontrado'});
        }
        return res.status(200).json({"mensaje":"Superheroe eliminado con exito",
                                    "superheroe":  superheroeEliminado
                                    });
    }catch(error){
        return res.status(500).send({mensaje:'Error al eliminar superheroe', error: error.message});
    }
}

//nuevos controllers tp3
//renders

export function addSuperheroRender(req,res){
    res.render('pages/addSuperhero',{
        title:'Agregar Superheroe', 
    });
}
export async function editarSuperheroRender(req,res){
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if(!superheroe){
            return res.status(404).send({mensaje:"superheroe no encontrado"});
        }
    res.status(200).render('pages/editSuperhero',{
        title:'Editar Superheroe',
        superheroe: superheroe,
    })
}

export function panelDeSuperheroRender(req,res){
    res.render('partials/home',{title:'Panel de Superheroes',});
}




/*
export function panelDeSuperheroRender(req,res){
    res.render('partials/dashboard',{
        title:'Panel de Superheroes',
        view:'pages/home',
    });
}
*/