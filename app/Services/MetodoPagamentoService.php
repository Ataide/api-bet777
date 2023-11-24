<?php

namespace App\Services\Pagamentos;

use App\Actions\PagSeguroFactory;

/**
 * [Classe de serviço do metodo de pagamento]
 */
class MetodoPagamentoService
{
    /**
     * [Description for $metodo]
     *
     * @var [type]
     */
    public $metodo;

    const pagSeguro = 'pagSeguro';

    public function __construct($metodo)
    {
        $this->metodo = $metodo;
    }

    public function handle()
    {
        switch ($this->metodo) {
            case self::pagSeguro:
                return (new PagSeguroFactory())->pagamento();

            default:
                return 'Método de Pagamento inválido!';
        }
    }
}
