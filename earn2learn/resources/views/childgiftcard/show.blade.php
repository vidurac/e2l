@extends('layouts.master')

@section('content')

    <h1>Childgiftcard</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>Card Id</th><th>House Id</th><th>Child Id</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $childgiftcard->id }}</td> <td> {{ $childgiftcard->card_id }} </td><td> {{ $childgiftcard->house_id }} </td><td> {{ $childgiftcard->child_id }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection