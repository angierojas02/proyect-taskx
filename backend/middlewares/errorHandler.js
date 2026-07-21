export const errorHandler = (err, req, res, next) => {
    
    console.error('Error capturado en el sistema:', err.message || err)

    
    const statusCode = err.statusCode || err.status || 500

    
    const errorResponse = {
        ok: false,
        status: err.status || 'error',
        error: {
            message: err.message || 'Error interno del servidor'
        }
    };

    
    if (process.env.NODE_ENV === 'development') {
        errorResponse.error.stack = err.stack ? err.stack.split('\n').map(line => line.trim()) : []
    }

    
    res.status(statusCode).json(errorResponse);
}